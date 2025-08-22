
 
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
  user?: {
    userId: number;
    username: string;
    email: string;
    // ...other user fields if needed
  };
}

@Injectable({ providedIn: 'root' })
export class VideoService {
  approveVideo(videoId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/approve/${videoId}`, JSON.stringify('approved'), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  rejectVideo(videoId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/reject/${videoId}`, JSON.stringify('rejected'), {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  private apiUrl = 'https://localhost:7295/api/Video';

  constructor(private http: HttpClient) {}

  getPendingVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.apiUrl}/pending`);
  }

  getAllVideos(): Observable<Video[]> {
    return this.http.get<Video[]>(this.apiUrl);
  }

  uploadVideo(file: File, title: string, description: string): Observable<any> {
    const formData = new FormData();
    formData.append('File', file);
    formData.append('Title', title);
    formData.append('Description', description);
    return this.http.post(this.apiUrl, formData);
  }

  getVideosByUser(userId: number): Observable<Video[]> {
    return this.http.get<Video[]>(`${this.apiUrl}/user/${userId}`);
  }

  deleteVideo(videoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${videoId}`);
  }

  getVideoById(videoId: number): Observable<Video> {
    return this.http.get<Video>(`${this.apiUrl}/${videoId}`);
  }
  
  

}
