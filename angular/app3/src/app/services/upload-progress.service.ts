import { Subscription } from 'rxjs';

export class UploadProgressService {
    public status: string = 'pendente'
    public state: any

    public getProgressoUpload(): number {
        if (this.state) {
            if (this.state.bytesTransferred && this.state.totalBytes) { 
                return Math.round(this.state.bytesTransferred * 100/this.state.totalBytes) 
            }
        }
        return 0        
    }
}