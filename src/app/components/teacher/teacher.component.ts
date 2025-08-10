import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { VideoService, Video } from '../../services/video.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  videos: Video[] = [];
  userId: number | null = null;

  constructor(
    private router: Router,
    private videoService: VideoService,
    private roleService: RoleService
  ) {}

  ngOnInit() {
  console.log('roleService in TeacherComponent:', this.roleService);
  this.userId = Number(this.roleService?.getUserId?.());
    if (this.userId) {
      this.videoService.getVideosByUser(this.userId).subscribe({
        next: (videos) => this.videos = videos,
        error: () => this.videos = []
      });
    }
  }

  onVideoSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const title = prompt('Enter video title:', 'new') || 'new';
      const description = prompt('Enter video description:', 'new') || 'new';
      this.videoService.uploadVideo(file, title, description).subscribe({
        next: () => {
          alert('Video uploaded successfully!');
          // Refresh video list
          if (this.userId) {
            this.videoService.getVideosByUser(this.userId).subscribe({
              next: (videos) => this.videos = videos,
              error: () => this.videos = []
            });
          }
        },
        error: () => alert('Failed to upload video!')
      });
    }
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
