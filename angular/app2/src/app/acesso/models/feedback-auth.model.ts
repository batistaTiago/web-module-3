export class FeedbackAuth {
    constructor(
        public sucesso: boolean,
        public error: Error = null
    ) {

    }
}