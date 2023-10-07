# Botinstein

This project contains a Discord bot I made with Discord.js for my school's Discord channel. You can also use this for your school's Discord channel.

---

## How it Works

I will explain how this bot works on my school's Discord channel since I actually made this bot for my school's Discord channel.

First off, let's cover specific roles for Botinstein. We have some roles of classes like `@9. sınıf`, `@10. sınıf`, `@11. sınıf`, `@12. sınıf` representing class degrees in our high school.

Similar to these classes, we have a `Misafir` role meaning `Guest` in English. We assign this role to those who are not currently in any class from our school. Except these roles, we have a `Muted` role representing members who are unable to speak or join in any kind of voice channels. And unsurprisingly, we have a `Bot` role to represent bots in our server. <br />

To cover specific channels for Botinstein, we have `👋-hoş-geldiniz-👋`, `📢-duyuru-📢`, `👍-öneriler-👎` channels meaning `👋-welcome-👋`, `📢-announcement-📢`, `👍-suggestions-👎` respectively and lastly the `❗reports❗` channel.

In the welcome channel, Botinstein greets new members. In the announcement channel, Botinstein makes announcements.

In the suggestions channel, Botinstein reacts to the suggestions with thumbs-up and thumbs-down for voting the suggestion.

---

## Commands

| Command          | What it does                                                                    | Only Staff |
| ---------------- | ------------------------------------------------------------------------------- | ---------- |
| `/ping`          | Replies with Pong!                                                              | `False`    |
| `/beep`          | Replies with Beep!                                                              | `False`    |
| `/members`       | The ID of the role representing those who are not in any class but are a guest. | `False`    |
| `/roll-dice`     | Returns a number from 1 to 6.                                                   | `False`    |
| `/github`        | Gives the link to the github of botinstein.                                     | `False`    |
| `/say`           | Sends a message as per the given text.                                          | `True`     |
| `/purge`         | Able to purge up to 99 messages.                                                | `True`     |
| `/kick`          | Kicks members.                                                                  | `True`     |
| `/ban`           | Bans users.                                                                     | `True`     |
| `/unban`         | Unbans users.                                                                   | `True`     |
| `/mute`          | Mutes members.                                                                  | `True`     |
| `/unmute`        | Unmutes members.                                                                | `True`     |
| `/report`        | Reports a member to the admins.                                                 | `False`    |
| `/pick-class`    | Gives the role of your class grade                                              | `False`    |
| `/reset-classes` | Removes classes of all members                                                  | `True`     |

---

## Events

| Event               | What it does                                                                                                     |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `guildMemberAdd`    | Greets new members in the welcome channel and automatically grants the new member a bot role if it's a bot.      |
| `guildMemberRemove` | Says goodbye to those who left the server.                                                                       |
| `messageCreate`     | If the interacted message is created in the suggestions channel, automatically reacts with 👍 and 👎 for voting. |

---

## Installation

```bash
$ git clone https://www.github.com/1TaylanOzturk/botinstein.git
$ cd botinstein/
$ npm install && npm start
```

---

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

| Env Variable              | Value                                                                              |
| ------------------------- | ---------------------------------------------------------------------------------- |
| `TOKEN`                   | The token of your Discord Bot.                                                     |
| `CLIENT_ID`               | The client ID of your Discord Bot.                                                 |
| `GUILD_ID`                | The guild ID of your server where you want to use this bot.                        |
| `BOT_ROLE_ID`             | The ID of the role representing bots in your server.                               |
| `MUTE_ROLE_ID`            | The ID of the role preventing the member from typing and accessing voice channels. |
| `GUEST_ROLE_ID`           | The ID of the role representing those who are not in any class but are a guest.    |
| `REPORT_CHANNEL_ID`       | The ID of the channel used to show admins the reports from participants.           |
| `ANNOUNCEMENT_CHANNEL_ID` | The ID of the channel used to make announcements.                                  |
| `WELCOME_CHANNEL_ID`      | The ID of the channel used to greet new members.                                   |
| `SUGGESTIONS_CHANNEL_ID`  | The ID of the channel used to serve public and votable suggestions.                |
| `CLASSES_CHANNEL_ID`      | The ID of the channel used to allow members to manage their classes.               |

---

## Contributing

Contributions are always welcome! But if you want to make some major changes, you'd like to consider opening a new issue. And lastly, please don't forget to leave a star if you liked this project!

---

## License

[GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/)

---

## Authors

- [@DrShahinstein](https://github.com/1TaylanOzturk)
