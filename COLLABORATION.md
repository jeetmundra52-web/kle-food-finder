# Inviting Team Members & Collaboration Guide

Since this project is already set up with Git, follow these steps to bring your team on board.

## 1. Invite Team Members to the Repository

1.  **Go to your Repository**: Open your project on GitHub (or GitLab/Bitbucket).
    *   You can find the URL by running: `git remote -v` in your terminal.
2.  **Settings**: Click on the **Settings** tab of the repository.
3.  **Collaborators**: Look for **Collaborators** (or "Manage Access" / "Members") in the sidebar.
4.  **Add People**: Click **Add people** and enter your team members' email addresses or usernames.
5.  **Send Invites**: They will receive an email invitation to join the repo.

## 2. Getting Your Team Started

Once they accept the invite, they can get the code:

1.  **Clone the Repo**:
    ```bash
    git clone <your-repo-url>
    cd kle-food-finder
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Run the Project**:
    ```bash
    npm run dev:all
    ```

## 3. Recommended Workflow

To avoid conflicts, use **branches** instead of everyone pushing to `main`.

1.  **Create a Branch** (for a new feature):
    ```bash
    git checkout -b feature/my-new-feature
    ```
2.  **Make Changes**: Edit code, save files.
3.  **Commit Changes**:
    ```bash
    git add .
    git commit -m "Added new feature"
    ```
4.  **Push to GitHub**:
    ```bash
    git push origin feature/my-new-feature
    ```
5.  **Create Pull Request (PR)**: Go to GitHub and open a Pull Request to merge your changes into `main`.

## 4. Syncing Changes

Before starting work, always pull the latest changes:
```bash
git pull origin main
```
