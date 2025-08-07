import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Video {
  videoId: number;
  userId: number;
  title: string;
  description: string;
  filePath: string;
  fileType: string;
  uploadDate: string;
  status: number;
  adminRemarks: string;
  approvalDate: string;
  viewCount: number;
  videoStatus: number;
}

@Injectable({ providedIn: 'root' })
export class VideoService {
  private apiUrl = 'https://localhost:7295/api/Video';

  constructor(private http: HttpClient) {}

  getAllVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.apiUrl);
  }
}
