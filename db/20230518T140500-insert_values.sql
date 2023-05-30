insert into users (username, password, session_token) values (
    "user_1",
    "password",
    "12345"
);

insert into users (username, password, session_token) values (
    "user_2",
    "password",
    "6789"
);

insert into channels (channel_name) values (
    "first_channel"
);

insert into channels (channel_name) values (
    "second_channel"
);

insert into messages (msg_body, channel_id, user_id, reply_body, reply_user_id) values (
    "hello everyone",
    1,
    1,
    NULL,
    NULL
);

insert into messages (msg_body, channel_id, user_id, reply_body, reply_user_id) values (
    "hey",
    2,
    1,
    "hey user1!",
    2
);