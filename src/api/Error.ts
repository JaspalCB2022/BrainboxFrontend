
export const Error = (err: any): string | undefined  => {
    console.log(err);
    return err?.data?.error?.message;
};
