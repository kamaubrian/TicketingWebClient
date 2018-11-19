-module(bot).
-author("jonathan.roes@gmail.com").
-export([connect/2, loop/1]).
-define(nickname, "jroes-test").
-define(channel, "#jroes-test").

% Connect to an IRC server with a given Host and Port.  Set up the TCP option to
% give us messages on a line-by-line basis.
connect(Host, Port) ->
        {ok, Sock} = gen_tcp:connect(Host, Port, [{packet, line}]),
        % According to RFC1459, we need to tell the server our nickname and username
        gen_tcp:send(Sock, "NICK " ++ ?nickname ++ "\r\n"),
        gen_tcp:send(Sock, "USER " ++ ?nickname ++ " blah blah blah blah\r\n"),
        loop(Sock).
        
% Now that we're connected, receive TCP messages and parse them.
loop(Sock) ->
        receive
                {tcp, Sock, Data} ->
                        io:format("[~w] Received: ~s", [Sock, Data]),
                        parse_line(Sock, string:tokens(Data, ": ")),
                        loop(Sock);
                quit ->
                        io:format("[~w] Received quit message, exiting...~n", [Sock]),
                        gen_tcp:close(Sock),
                        exit(stopped)
        end.

% The following is an example of the message this fun intends to parse.  Here we see
% the limitation that tokenizing the string on both :'s and spaces puts on us.
% [#Port<0.124>] Received: :jroes!jroes@mask-2EDB8BDB.net PRIVMSG #jroes-test :jroes-test: wassup?
parse_line(Sock, [User,"PRIVMSG",Channel,?nickname|_]) ->
        Nick = lists:nth(1, string:tokens(User, "!")),
        irc_privmsg(Sock, Channel, "You talkin to me, " ++ Nick ++ "?");
        
% If the second token is "376", then join our channel.  376 indicates End of MOTD.
parse_line(Sock, [_,"376"|_]) ->
        gen_tcp:send(Sock, "JOIN :" ++ ?channel ++ "\r\n");

% The server will periodically send PINGs and expect you to PONG back to make sure
% you haven't lost the connection.
parse_line(Sock, ["PING"|Rest]) ->
        gen_tcp:send(Sock, "PONG " ++ Rest ++ "\r\n");

parse_line(_, _) ->
        0.

% This just helps us write a PRIVMSG back to a client without having to type
% the newlines and :'s ourselves so much.  It'll be more useful later.
irc_privmsg(Sock, To, Message) ->
        gen_tcp:send(Sock, "PRIVMSG " ++ To ++ " :" ++ Message ++ "\r\n").
