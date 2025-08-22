import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VideoService, Video } from '../../services/video.service';
import { CertificateService } from '../../services/certificate.service';
import { RoleService } from '../../services/role.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videos: Video[] = [];
  selectedVideo: Video | null = null;

  onCertificateSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const maxSizeMB = 10;
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert('File size must be less than 10 MB.');
        return;
      }
      const title = prompt('Enter certificate title:', 'CERTIFICATE') || 'CERTIFICATE';
      const description = prompt('Enter certificate description:', 'CERTIF') || 'CERTIF';
      this.certificateService.uploadCertificate(file, title, description).subscribe({
        next: (res) => {
          alert('Certificate uploaded successfully!');
        },
        error: (err) => {
          alert('Failed to upload certificate.');
        }
      });
    }
  }

  constructor(
    private router: Router,
    private videoService: VideoService,
    private certificateService: CertificateService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
    this.videoService.getAllVideos().subscribe({
      next: (data) => this.videos = data,
      error: () => this.videos = []
    });
  }

  playVideo(video: Video) {
    console.log('playVideo called with:', video);
    this.selectedVideo = video;
  }

  closePlayer() {
    this.selectedVideo = null;
  }

  logout() {
    localStorage.removeItem('token');
    this.roleService.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  getThumbnail(video: Video): string {
    // If you have a thumbnail property, use it. Otherwise, use a placeholder or generate from filePath
    return 'https://img.icons8.com/color/480/video-playlist.png';
  }

  getVideoUrl(video: Video): string {
    // Use the relative streaming API endpoint for Angular proxy
    return `/api/Video/stream/${video.videoId}`;
  }
}
