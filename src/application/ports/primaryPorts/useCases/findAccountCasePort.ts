export interface FindAccountCasePort{
    exec(account: string, dependencies): Promise<any>
}