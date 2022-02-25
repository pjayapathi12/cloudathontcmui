export interface ErrorSummary {
    resourceName: string;
    summaryViewStats?: Array<SummaryByEnv>;
}

export interface SummaryByEnv {
    env: string;
    totalCount: number;
    error?: Array<ErrorTypeCount>;
}

export interface ErrorTypeCount {
    errorType: string;
    errorCount: number;
}

export interface ErrorDetails {
    errorName: string;
    errorType: string;
    jira: string;
    jiraStatus: string;
    resourceName: string;
    data?: Array<DetailByEnv>;
}

export interface DetailByEnv {
    env: string;
    total: number;
    dailyStats?: Array<DailyStats>;
}

export interface DailyStats {
    date: string;
    count: number
}

export interface ErrorView {
    env: string;
    errorType: string;
    errorName: string;
    jira: string;
    jiraStatus: string;
    count: number;
    isNetNew: boolean;
}