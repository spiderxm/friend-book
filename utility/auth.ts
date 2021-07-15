import {NextApiRequest, NextPageContext} from "next";
import {parseCookies} from "nookies";

export const isLoggedIn = (context: Pick<NextPageContext, "req"> | { req: NextApiRequest; } | { req: any; } | null | undefined) => {
    const cookies = parseCookies(context);
    return cookies['refresh-token'] && cookies['access-token'];
}