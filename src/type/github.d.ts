 export type GithubIssueType = {
    url:                      string;
    repository_url:           string;
    labels_url:               string;
    comments_url:             string;
    events_url:               string;
    html_url:                 string;
    id:                       number;
    node_id:                  string;
    number:                   number;
    title:                    string;
    user:                     User;
    labels:                   Label[];
    state:                    State;
    locked:                   boolean;
    assignee:                 User | null;
    assignees:                User[];
    milestone:                null;
    comments:                 number;
    created_at:               string;
    updated_at:               string;
    closed_at:                null;
    author_association:       AuthorAssociation;
    active_lock_reason:       null;
    body:                     string;
    reactions:                Reactions;
    timeline_url:             string;
    performed_via_github_app: null;
    state_reason:             null | string;
    draft?:                   boolean;
    pull_request?:            PullRequest;
}

 type User = {
    login:               string;
    id:                  number;
    node_id:             string;
    avatar_url:          string;
    gravatar_id:         string;
    url:                 string;
    html_url:            string;
    followers_url:       string;
    following_url:       string;
    gists_url:           string;
    starred_url:         string;
    subscriptions_url:   string;
    organizations_url:   string;
    repos_url:           string;
    events_url:          string;
    received_events_url: string;
    type:                Type;
    site_admin:          boolean;
}

 type Type = "User";

 type AuthorAssociation = "NONE" | "MEMBER" | "CONTRIBUTOR";

 type Label = {
    id:          number;
    node_id:     string;
    url:         string;
    name:        string;
    color:       string;
    default:     boolean;
    description: null | string;
}

 type PullRequest = {
    url:       string;
    html_url:  string;
    diff_url:  string;
    patch_url: string;
    merged_at: null;
}

 type Reactions = {
    url:         string;
    total_count: number;
    "+1":        number;
    "-1":        number;
    laugh:       number;
    hooray:      number;
    confused:    number;
    heart:       number;
    rocket:      number;
    eyes:        number;
}

type State = "open";

export type IssueCommentType = {
    url:                      string;
    html_url:                 string;
    issue_url:                string;
    id:                       number;
    node_id:                  string;
    user:                     User;
    created_at:               Date;
    updated_at:               Date;
    author_association:       string;
    body:                     string;
    reactions:                Reactions;
    performed_via_github_app: null;
}

type Reactions = {
    url:         string;
    total_count: number;
    "+1":        number;
    "-1":        number;
    laugh:       number;
    hooray:      number;
    confused:    number;
    heart:       number;
    rocket:      number;
    eyes:        number;
}

