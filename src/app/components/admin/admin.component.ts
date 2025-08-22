

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VideoService, Video } from '../../services/video.service';
import { CertificateService } from '../../services/certificate.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.component.html', // <-- Use this
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  downloadCertificate(certificateId: number, fileName: string) {
    this.certificateService.downloadCertificate(certificateId).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || 'certificate.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }
  pendingVideos: Video[] = [];
  pendingCertificates: any[] = [];
  activeTab: string = 'videos';

  constructor(
    private router: Router,
    private videoService: VideoService,
    private certificateService: CertificateService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.fetchPendingVideos();
    this.fetchPendingCertificates();
  }

  fetchPendingVideos() {
    this.videoService.getPendingVideos().subscribe({
      next: (videos) => this.pendingVideos = videos,
      error: () => this.pendingVideos = []
    });
  }

  fetchPendingCertificates() {
    this.certificateService.getPendingCertificates().subscribe({
      next: (certs) => this.pendingCertificates = certs,
      error: () => this.pendingCertificates = []
    });
  }

  approveVideo(videoId: number) {
    this.videoService.approveVideo(videoId).subscribe({
      next: () => {
        this.pendingVideos = this.pendingVideos.filter(v => v.videoId !== videoId);
      },
      error: () => {
        // Optionally show error message
      }
    });
  }

  rejectVideo(videoId: number) {
    this.videoService.rejectVideo(videoId).subscribe({
      next: () => {
        this.pendingVideos = this.pendingVideos.filter(v => v.videoId !== videoId);
      },
      error: () => {
        // Optionally show error message
      }
    });
  }

  approveCertificate(certificateId: number) {
    this.certificateService.approveCertificate(certificateId).subscribe({
      next: () => {
        this.pendingCertificates = this.pendingCertificates.filter(c => c.certificateId !== certificateId);
      },
      error: () => {
        // Optionally show error message
      }
    });
  }

  rejectCertificate(certificateId: number) {
    this.certificateService.rejectCertificate(certificateId).subscribe({
      next: () => {
        this.pendingCertificates = this.pendingCertificates.filter(c => c.certificateId !== certificateId);
      },
      error: () => {
        // Optionally show error message
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.roleService.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}
