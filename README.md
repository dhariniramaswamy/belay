# Final Project: Belay (a Slack clone)


## Introduction

For my capstone project for Web Development, I combined the various
front-end and back-end techniques I've learned over the course to produce a
modern, database-backed single-page application called Belay. Belay behaves
similarly to Slack but is significantly smaller in scope.

## Core Behavior

- Belay lets users send and read real-time chat messages that are organized into
  rooms called Channels. Users see a list of all the channels on the server and
  can click one to enter that channel. Inside, they see all the messages posted
  to that channel by any user, and can post their own messages. All messages
  belong to a channel and all channels are visible to all users; we don't need
  to implement private rooms or direct messages.
- Any user can create a new channel by supplying a display name. Channel names
  must be unique. 
- Like Slack, messages may be threaded as Replies in response to a message in a
  channel. Messages in the channel will display how many replies they have if
  that number is greater than zero. We don't support nested threads; messages
  either belong directly to a channel or are replies in a thread to a message
  that does, but replies can't have nested replies of their own.

  ## Refactoring
  I am currently working on making the React components more dynamic using
  ```switch``` statements and adding more functionality for users. I'm
  also working on the CSS portion to make the front end more intuitive
  and visually appealing.


