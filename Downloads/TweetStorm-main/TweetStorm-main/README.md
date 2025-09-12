## Project Setup

Make sure you have `nodejs` and `mysql` installed.

1. Clone the project using command:

```bash
git clone https://github.com/TweetStorm/TweetStorm.git
```

2. In the root project folder, install all the dependencies using:

```bash
npm install
```

3. Create `.env` and `.env.local` files and add the values of the environment variables defined in `.env-sample` and `.env.local-sample` files respectively. Make sure to provide the right values of the environment variables.

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view running app.

For production environment, first build the application:

```bash
npm run build
```

Then run the production server:

```bash
npm start
```

## Test Stripe in Development

To test stripe functionality in dev environment make sure to get the following envs:

- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET`

both these envs can be obtained from the stripe dashboard for testing. **MAKE SURE** to add only test keys and not the live keys.

After that install the stripe cli by following the installation instructions at https://docs.stripe.com/stripe-cli. After installation, run the application's dev server if not already and run the following command in another terminal:

```bash
stripe listen --forward-to=localhost:3000/api/webhook
```

On running the above command, a webhook secret will be output to the console. Copy it and add it as the value of the `STRIPE_WEBHOOK_SECRET` env. This secret remains the same on every run of above command, so you only need to add it once.

## Environment Variables and Github Secrets

We are storing our production environment variables in the `PROD_ENV` github secret.

## Git Usage Protocols

- Branch `main` is our production branch. Every change we push in main will be automatically deployed. NEVER push to the `main` branch directly.
- Only and only the `develop` branch will be merged into `main`.
- All the working branches i.e. feature, bug fixes etc will be created from and merged into `develop`.
- Before merging `develop` into `main`, test the `develop` branch thoroughly in staging environment.
- There may be some rare cases, where `main` branch is updated without merging from the `develop` branch. Like pushing to the `main` branch directly due to an emergency bug fix. In such case, merge the updated `main` in `develop` and only `develop` branch.

## Branch Merge protocols

- Never merge a branch without creating a pull request. Branches must only be merged through Pull Requests.

- For all the PRs of working branches, the base branch must always be set to `develop`.

## Deployment Protocols

The deployment of the application will take place automatically through github actions when we push a commit to the `main` branch. The `main` branch must only be updated by merging the `develop` branch into it.

When the `develop` branch is ready to be merged in `main`, before the merge, copy all the environment variables from the `.env.local` and `.env` files on the server and temporarily save them somewhere. This is done because we may have changed the environment variables in the github secrets and we may need the old variables in case the deployment fails.
