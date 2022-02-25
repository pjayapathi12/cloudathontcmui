export class ErrorSummary {
    resourceName: string;
    summaryViewStats?: Array<SummaryByEnv>;
}

export class SummaryByEnv {
    env: string;
    totalCount: number;
    error?: Array<ErrorTypeCount>;
}

export class ErrorTypeCount {
    errorType: string;
    errorCount: number;
}

export class ErrorDetails {
    errorName: string;
    errorType: string;
    jira: string;
    jiraStatus: string;
    resourceName: string;
    data?: Array<DetailByEnv>;
}

export class DetailByEnv {
    env: string;
    total: number;
    dailyStats?: Array<DailyStats>;
}

export class DailyStats {
    date: string;
    count: number
}

export class ErrorView {
    env: string;
    errorType: string;
    errorName: string;
    jira: string;
    jiraStatus: string;
    count: number;
    isNetNew: boolean;
}