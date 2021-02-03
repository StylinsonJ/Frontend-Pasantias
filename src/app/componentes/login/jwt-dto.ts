export class JwtDTO {
    id: number | undefined;
    username: string = "";
    email: string | undefined;
    roles: string[] = [];
    accessToken: string = "";
    type: string | undefined;
}
