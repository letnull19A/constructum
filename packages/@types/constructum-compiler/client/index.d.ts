export declare const trpcClient: (host: string, port: number) => {
    build: {
        query: import("@trpc/client").Resolver<import("@trpc/server").BuildProcedure<"query", {
            _config: import("@trpc/server").RootConfig<{
                ctx: object;
                meta: object;
                errorShape: import("@trpc/server").DefaultErrorShape;
                transformer: import("@trpc/server").DefaultDataTransformer;
            }>;
            _meta: object;
            _ctx_out: object;
            _input_in: {
                syntaxName: string;
                projectData: string;
            };
            _input_out: {
                syntaxName: string;
                projectData: string;
            };
            _output_in: typeof import("@trpc/server").unsetMarker;
            _output_out: typeof import("@trpc/server").unsetMarker;
        }, string | import("constructum-interfaces/queries/IBuildProjectResponse").IBuildProjectResponse[] | import("@trpc/server").TRPCError>>;
    };
};
