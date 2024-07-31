# cdn.wolfstar.rocks

[![Discord](https://discord.com/api/guilds/830481105261821952/embed.png)](https://join.wolfstar.rocks)
[![Docker Pulls](https://img.shields.io/docker/pulls/wolfstarbot/wolfstar.rocks?logo=docker&logoColor=white)](https://hub.docker.com/r/wolfstarbot/wolfstar.rocks)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── node_modules/
├── public/
├── src/
│   ├── layouts/
│   │   └── structures/
│   ├── utils/
│   ├── pages/
│   │   └── api/
│   │       ├── delete/
│   │       ├── info/
│   │       └── upsert/
│   └── env.d.ts
├── .env.example
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

## Configuration

To run the CDN locally:

1. Clone this repository to a local folder
2. Copy the `.env.example` file and rename it to `.env`
3. Fill in the environment variables in the `.env` file. Here's an example of the required variables:

    ```
    S3_ENDPOINT=''
    S3_REGION=''
    S3_BUCKET=''

    AWS_ACCESS_KEY_ID=''
    AWS_SECRET_ACCESS_KEY=''

    QUALITY=80
    SECRET_KEY=''

    # Hostname and Ports
    PORT=3000
    HOST='localhost'
    ```

4. Install dependencies with `yarn`
5. Run `yarn dev` to start the Astro development server

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command          | Action                                           |
| :--------------- | :----------------------------------------------- |
| `yarn`           | Installs dependencies                            |
| `yarn dev`       | Starts local dev server at `localhost:3000`      |
| `yarn build`     | Build your production site to `./dist/`          |
| `yarn preview`   | Preview your build locally, before deploying     |
| `yarn astro ...` | Run CLI commands like `astro add`, `astro check` |

## Links

**WolfStar Links**

-   [WolfStar Invite Link](https://invite.wolfstar.rocks)
-   [Support Server](https://join.wolfstar.rocks)

## Contributors

Please make sure to read the [Contributing Guide][contributing] before making a pull request.

Thank you to all the people who have already contributed to the WolfStar Project!

<a href="https://github.com/wolfstar-project/cdn.wolfstar.rocks/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=wolfstar-project/cdn.wolfstar.rocks" />
</a>

[contributing]: https://github.com/wolfstar-project/.github/blob/main/.github/CONTRIBUTING.md

## Buy us some doughnuts

Skyra Project is open source and always will be, even if we don't get donations. That said, we know there are amazing people who
may still want to donate just to show their appreciation. Thank you very much in advance!

We accept donations through Patreon, BitCoin, Ethereum, and Litecoin. You can use the buttons below to donate through your method of choice.

| Donate With |       QR       |      Address       |
| :---------: | :------------: | :----------------: |
|    Ko-fi    | ![KoFiImage][] | [Click Here][kofi] |

[KoFiImage]: https://cdn.wolfstar.rocks/gh-assets/ko-fi.png
[kofi]: https://donate.wolfstar.rocks/ko-fi
