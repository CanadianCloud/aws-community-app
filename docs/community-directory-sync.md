# Monthly AWS user-group directory refresh

The GitHub workflow refresh-community-directory.yml runs on the first day of every month at 10:23 UTC. It can also be run manually. Updating its code triggers a check immediately.

The script opens the public AWS Builder Center directory, loads every page, and reads each group name, published location and Join website. It adds new groups, updates listed URLs, retains existing IDs and preserves existing entries that disappear temporarily. If fewer than 100 groups are retrieved, the run fails without replacing the catalogue.

Vancouver, Toronto and Victoria always use vancouver.awsday.ca, toronto.awsday.ca and victoria.awsday.ca. These overrides survive every refresh. Other groups use the published AWS directory website.

The workflow commits only src/data/community-directory.json. It requires contents:write on GITHUB_TOKEN. No external secrets are needed. The app fetches this public JSON when it starts, caches it, and falls back to its bundled catalogue offline.

GitHub may disable scheduled workflows in an inactive public repository after 60 days. If that happens, re-enable the workflow in Actions. The Actions run log shows retrieval failures and committed additions.

The initial catalogue includes 342 existing entries plus Toronto and Victoria, which were missing from the old snapshot. Counts may grow with future refreshes.