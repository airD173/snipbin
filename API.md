# SnipBin API Documentation

The base endpoint for the API is `https://snip.hxrsh.in/api`

You DO NOT need any API keys to access the API, unless you need
to do specific operations which require an account. Examples include:

- Linking a snip with your account
- Editing a snip
- Deleting a snip

To provide a token to the API, simply set the `Authorization` header
to your unique API key.

The `Authorization` header is in the following format:

```
Authorization: token
```

You can find your API key at `https://snip.hxrsh.in/jwt`. If you're
one of those doofuses who posts their API key to their GitHub repo,
too bad! We currently don't support regenerating API keys, however,
that is all subject to change.

# Objects

### Snip Object

| field     | type        | description                         |
| --------- | ----------- | ----------------------------------- |
| id        | int         | Auto-incremental ID of the snippet  |
| slug      | varchar(20) | The unique slug of the snippet      |
| content   | longtext    | The content of the snippet          |
| password  | varchar(20) | The password of the snippet         |
| language  | varchar(20) | The language of the snippet         |
| author    | User        | The account linked with the snippet |
| createdAt | DateTime    | When the snippet was created        |

### User Object

| field     | type         | description                       |
| --------- | ------------ | --------------------------------- |
| id        | int          | Auto-incremental ID of the user   |
| email     | varchar(191) | The email of the user             |
| name      | varchar(191) | The name of the user              |
| api       | varchar(191) | The user's unique API key         |
| snips     | Snip[]       | The snippets linked with the user |
| createdAt | DateTime     | When the user was created         |

# Endpoints

### Fetching snips (GET /snip/{id})

NOTE: This DOES NOT work on encrypted snips.

This returns a full snip object as shown below:

| field     | type        | description                         |
| --------- | ----------- | ----------------------------------- |
| id        | int         | Auto-incremental ID of the snippet  |
| slug      | varchar(20) | The unique slug of the snippet      |
| content   | longtext    | The content of the snippet          |
| password  | varchar(20) | The password of the snippet         |
| language  | varchar(20) | The language of the snippet         |
| author    | User        | The account linked with the snippet |
| createdAt | DateTime    | When the snippet was created        |

### Creating snips (POST /snip/new)

This does not require an API key. Although, if you would like the snip
to be linked with your account please set an `Authorization` header.

Required JSON body:

| field    | optional | type        | description                                |
| -------- | -------- | ----------- | ------------------------------------------ |
| slug     | no       | varchar(20) | The unique slug of the snippet             |
| content  | no       | longtext    | The content of the snippet                 |
| password | yes      | varchar(20) | The password of the snippet                |
| language | no       | varchar(20) | The language of the snippet (autodetected) |
| author   | yes      | User        | The account linked with the snippet        |

### Editing snips (PUT /snip/{id}/edit)

nSince you can only edit snips on your account, the `Authorization` header
is required here.

To edit a snip, add the values you're editing in the JSON body.

This returns a full snip object as show below:

| field     | editable | type        | description                                |
| --------- | -------- | ----------- | ------------------------------------------ |
| id        | no       | int         | Auto-incremental ID of the snippet         |
| slug      | yes      | varchar(20) | The unique slug of the snippet             |
| content   | yes      | longtext    | The content of the snippet                 |
| password  | yes      | varchar(20) | The password of the snippet                |
| language  | no       | varchar(20) | The language of the snippet (autodetected) |
| author    | no       | User        | The account linked with the snippet        |
| createdAt | no       | DateTime    | When the snippet was created               |

### Deleting snips (DELETE /snip/{id}/delete)

NOTE: This action is irreversible.

Since you can only delete pasttes you own, your must provide an `Authorization`
header on the request.

### Detecting code language

This uses [LangMyst](https://lang.myst.rs), which is an API wrapper around
[go-enry])(https://github.com/go-enry/go-enry) to detect the programming
language of a snippet.

# API Wrappers/Libraries

Here are some other API libraries developed by other people. They're not
directly supported by me, however, a big thanks to the developers for taking
their time out and making them. Be sure to give them a star!

If you would like your API to be added here, simply open an issue or discussion
on our [GitHub repository](https://github.com/harshhhdev/snipbin). I'll review
nd play around with your API. If I approve it, I'll add it on this list.

- [snipbin.js](https://github.com/harshhhdev/snipbin.js)"
