// export async function getBranchProtectionDetails(owner, repo, octokit, branch) {
// https://docs.github.com/en/rest/branches/branches?apiVersion=2022-11-28#get-branch-protection


import { OctokitCheckStrategy } from './octokit-check-strategy.js'

export class BranchProtectionStrategy extends OctokitCheckStrategy {
  constructor(repoName, owner, octokit, branchName = 'main') {
    super(repoName, owner, octokit, branchName);

    this.options = {
      owner: this.owner,
      repo: this.repo,
      branch: this.branchName,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    }
    this.endpoint = 'GET /repos/{owner}/{repo}/branches/main/protection'
  }
  
  async formatResponse() {
    try {
      const response = await this.makeOctokitRequest()
      return {
        'branch_protection': response.data 
      }
    } catch (error) {
      if(error.message == 'Branch not protected') {
        // if (error.status === 404) {
        return {
          'branch_protection': false 
        }
      } else {
        return {
          'branch_protection': `error: ${error.message}` 
        }
      }

    }
  }
}

// Sample payload
  // {
  //   "url": "https://api.github.com/repos/octocat/Hello-World/branches/master/protection",
  //   "required_status_checks": {
  //     "url": "https://api.github.com/repos/octocat/Hello-World/branches/master/protection/required_status_checks",
  //     "contexts": [
  //       "continuous-integration/travis-ci"
  //     ],
  //     "contexts_url": "https://api.github.com/repos/octocat/Hello-World/branches/master/protection/required_status_checks/contexts",
  //     "enforcement_level": "non_admins"
  //   },
  //   "enforce_admins": {
  //     "url": "https://api.github.com/repos/octocat/Hello-World/branches/master/protection/enforce_admins",
  //     "enabled": true
  //   },
  //   "required_pull_request_reviews": {
  //     "url": "https://api.github.com/repos/octocat/Hello-World/branches/master/protection/required_pull_request_reviews",
  //     "dismissal_restrictions": {
  //       "url": "https://api.github.com/repos/octocat/Hello-World/branches/master/protection/dismissal_restrictions",
  //       "users_url": "https://api.github.com/repos/octocat/Hello-World/branches/master/protection/dismissal_restrictions/users",
  //       "teams_url": "https://api.github.com/repos/octocat/Hello-World/branches/master/protection/dismissal_restrictions/teams",
  //       "users": [
  //         {
  //           "login": "octocat",
  //           "id": 1,
  //           "node_id": "MDQ6VXNlcjE=",
  //           "avatar_url": "https://github.com/images/error/octocat_happy.gif",
  //           "gravatar_id": "",
  //           "url": "https://api.github.com/users/octocat",
  //           "html_url": "https://github.com/octocat",
  //           "followers_url": "https://api.github.com/users/octocat/followers",
  //           "following_url": "https://api.github.com/users/octocat/following{/other_user}",
  //           "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
  //           "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
  //           "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
  //           "organizations_url": "https://api.github.com/users/octocat/orgs",
  //           "repos_url": "https://api.github.com/users/octocat/repos",
  //           "events_url": "https://api.github.com/users/octocat/events{/privacy}",
  //           "received_events_url": "https://api.github.com/users/octocat/received_events",
  //           "type": "User",
  //           "site_admin": false
  //         }
  //       ],
  //       "teams": [
  //         {
  //           "id": 1,
  //           "node_id": "MDQ6VGVhbTE=",
  //           "url": "https://api.github.com/teams/1",
  //           "html_url": "https://github.com/orgs/github/teams/justice-league",
  //           "name": "Justice League",
  //           "slug": "justice-league",
  //           "description": "A great team.",
  //           "privacy": "closed",
  //           "notification_setting": "notifications_enabled",
  //           "permission": "admin",
  //           "members_url": "https://api.github.com/teams/1/members{/member}",
  //           "repositories_url": "https://api.github.com/teams/1/repos",
  //           "parent": null
  //         }
  //       ],
  //       "apps": [
  //         {
  //           "id": 1,
  //           "slug": "octoapp",
  //           "node_id": "MDExOkludGVncmF0aW9uMQ==",
  //           "owner": {
  //             "login": "github",
  //             "id": 1,
  //             "node_id": "MDEyOk9yZ2FuaXphdGlvbjE=",
  //             "url": "https://api.github.com/orgs/github",
  //             "repos_url": "https://api.github.com/orgs/github/repos",
  //             "events_url": "https://api.github.com/orgs/github/events",
  //             "hooks_url": "https://api.github.com/orgs/github/hooks",
  //             "issues_url": "https://api.github.com/orgs/github/issues",
  //             "members_url": "https://api.github.com/orgs/github/members{/member}",
  //             "public_members_url": "https://api.github.com/orgs/github/public_members{/member}",
  //             "avatar_url": "https://github.com/images/error/octocat_happy.gif",
  //             "description": "A great organization"
  //           },
  //           "name": "Octocat App",
  //           "description": "",
  //           "external_url": "https://example.com",
  //           "html_url": "https://github.com/apps/octoapp",
  //           "created_at": "2017-07-08T16:18:44-04:00",
  //           "updated_at": "2017-07-08T16:18:44-04:00",
  //           "permissions": {
  //             "metadata": "read",
  //             "contents": "read",
  //             "issues": "write",
  //             "single_file": "write"
  //           },
  //           "events": [
  //             "push",
  //             "pull_request"
  //           ]
  //         }
  //       ]
  //     },
  //     "dismiss_stale_reviews": true,
  //     "require_code_owner_reviews": true,
  //     "required_approving_review_count": 2,
  //     "require_last_push_approval": true
  //   },
  //   "restrictions": {
  //     "url": "https://api.github.com/repos/octocat/Hello-World/branches/master/protection/restrictions",
  //     "users_url": "https://api.github.com/repos/octocat/Hello-World/branches/master/protection/restrictions/users",
  //     "teams_url": "https://api.github.com/repos/octocat/Hello-World/branches/master/protection/restrictions/teams",
  //     "apps_url": "https://api.github.com/repos/octocat/Hello-World/branches/master/protection/restrictions/apps",
  //     "users": [
  //       {
  //         "login": "octocat",
  //         "id": 1,
  //         "node_id": "MDQ6VXNlcjE=",
  //         "avatar_url": "https://github.com/images/error/octocat_happy.gif",
  //         "gravatar_id": "",
  //         "url": "https://api.github.com/users/octocat",
  //         "html_url": "https://github.com/octocat",
  //         "followers_url": "https://api.github.com/users/octocat/followers",
  //         "following_url": "https://api.github.com/users/octocat/following{/other_user}",
  //         "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
  //         "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
  //         "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
  //         "organizations_url": "https://api.github.com/users/octocat/orgs",
  //         "repos_url": "https://api.github.com/users/octocat/repos",
  //         "events_url": "https://api.github.com/users/octocat/events{/privacy}",
  //         "received_events_url": "https://api.github.com/users/octocat/received_events",
  //         "type": "User",
  //         "site_admin": false
  //       }
  //     ],
  //     "teams": [
  //       {
  //         "id": 1,
  //         "node_id": "MDQ6VGVhbTE=",
  //         "url": "https://api.github.com/teams/1",
  //         "html_url": "https://github.com/orgs/github/teams/justice-league",
  //         "name": "Justice League",
  //         "slug": "justice-league",
  //         "description": "A great team.",
  //         "privacy": "closed",
  //         "notification_setting": "notifications_enabled",
  //         "permission": "admin",
  //         "members_url": "https://api.github.com/teams/1/members{/member}",
  //         "repositories_url": "https://api.github.com/teams/1/repos",
  //         "parent": null
  //       }
  //     ],
  //     "apps": [
  //       {
  //         "id": 1,
  //         "slug": "octoapp",
  //         "node_id": "MDExOkludGVncmF0aW9uMQ==",
  //         "owner": {
  //           "login": "github",
  //           "id": 1,
  //           "node_id": "MDEyOk9yZ2FuaXphdGlvbjE=",
  //           "url": "https://api.github.com/orgs/github",
  //           "repos_url": "https://api.github.com/orgs/github/repos",
  //           "events_url": "https://api.github.com/orgs/github/events",
  //           "hooks_url": "https://api.github.com/orgs/github/hooks",
  //           "issues_url": "https://api.github.com/orgs/github/issues",
  //           "members_url": "https://api.github.com/orgs/github/members{/member}",
  //           "public_members_url": "https://api.github.com/orgs/github/public_members{/member}",
  //           "avatar_url": "https://github.com/images/error/octocat_happy.gif",
  //           "description": "A great organization"
  //         },
  //         "name": "Octocat App",
  //         "description": "",
  //         "external_url": "https://example.com",
  //         "html_url": "https://github.com/apps/octoapp",
  //         "created_at": "2017-07-08T16:18:44-04:00",
  //         "updated_at": "2017-07-08T16:18:44-04:00",
  //         "permissions": {
  //           "metadata": "read",
  //           "contents": "read",
  //           "issues": "write",
  //           "single_file": "write"
  //         },
  //         "events": [
  //           "push",
  //           "pull_request"
  //         ]
  //       }
  //     ]
  //   },
  //   "required_linear_history": {
  //     "enabled": true
  //   },
  //   "allow_force_pushes": {
  //     "enabled": true
  //   },
  //   "allow_deletions": {
  //     "enabled": true
  //   },
  //   "required_conversation_resolution": {
  //     "enabled": true
  //   },
  //   "lock_branch": {
  //     "enabled": true
  //   },
  //   "allow_fork_syncing": {
  //     "enabled": true
  //   }
  // }