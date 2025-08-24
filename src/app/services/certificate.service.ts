import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CertificateService {

  

  private apiUrl = 'https://localhost:7295/api/Certificate';

  constructor(private http: HttpClient) {}

  uploadCertificate(file: File, title: string, description: string): Observable<any> {
    const formData = new FormData();
    formData.append('File', file);
    formData.append('Title', title);
    formData.append('Description', description);
    return this.http.post(this.apiUrl, formData);
  }

    getPendingCertificates(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pending`);
  }

  approveCertificate(certificateId: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/approve/${certificateId}`,
      { dto: { remarks: 'approved' } },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  rejectCertificate(certificateId: number): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/reject/${certificateId}`,
      { remarks: 'rejected' },
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
  downloadCertificate(certificateId: number) {
    return this.http.get(`${this.apiUrl}/download/${certificateId}`, { responseType: 'blob' });
  }

}
  