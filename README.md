# Quality_Education_UI

# 📚 Education Portal

A full-stack education portal platform built with .NET 8 (Backend) and Angular (Frontend) supporting learning content, assessments, and community engagement.

---

## 🚀 Modules Overview

- **Authentication and Authorization** – Secure login with role-based access.
- **Certificate Management** – Teachers upload and verify certificates.
- **Video Management** – Teachers upload, and reviewers approve educational videos.
- **Content Access** – Users can browse and view approved videos.
- **Reporting and Analytics** – Admins access reports and download insights.
- **User Management** – Manage users and roles.
- **Quiz Module** – Users take quizzes related to learning content.
- **Community Forum** – Post, reply, and discuss topics.
- **Comment and Like System** – Interact with videos through comments and likes.

---

## 🔄 Module Workflows

### 1. Authentication and Authorization
- Users register and log in.
- Roles: Admin, Teacher, Reviewer, User.
- Features accessible based on roles.

### 2. Certificate Management
- Teachers upload certificates.
- Admin approves/rejects.
- Only approved teachers can upload videos.

### 3. Video Management
- Teachers upload videos post-approval.
- Reviewers approve/reject videos.
- Approved videos become visible.

### 4. Content Access
- Users can search and view approved videos.

### 5. Reporting and Analytics
- Admins generate reports on user activity, certificates, and videos.

### 6. User Management
- Admins manage user details and roles.

### 7. Quiz Module
- Admins create quizzes.
- Users take quizzes and see scores.

### 8. Community Forum
- Users post and reply to discussions.
- Admins moderate content.

### 9. Comment and Like System
- Users comment on and like/unlike videos.

---

## 🗃️ Database Design

### Tables and Relationships

#### Users
- `UserId`, `Username`, `PasswordHash`, `Email`, `RoleId`, `IsActive`
- ↪ `RoleId → Roles`

#### Roles
- `RoleId`, `RoleName`

#### Certificates
- `CertificateId`, `UserId`, `FilePath`, `Status`, `UploadedAt`
- ↪ `UserId → Users`

#### Videos
- `VideoId`, `UserId`, `FilePath`, `Status`, `UploadedAt`
- ↪ `UserId → Users`

#### Comments
- `CommentId`, `VideoId`, `UserId`, `Content`, `CreatedAt`
- ↪ `VideoId → Videos`, `UserId → Users`

#### Likes
- `LikeId`, `VideoId`, `UserId`, `CreatedAt`
- ↪ `VideoId → Videos`, `UserId → Users`

#### Quizzes
- `QuizId`, `Title`, `Description`, `CreatedBy`, `CreatedAt`
- ↪ `CreatedBy → Users`

#### Questions
- `QuestionId`, `QuizId`, `QuestionText`, `Options`, `CorrectAnswer`
- ↪ `QuizId → Quizzes`

#### QuizAttempts
- `AttemptId`, `QuizId`, `UserId`, `Score`, `AttemptedAt`
- ↪ `QuizId → Quizzes`, `UserId → Users`

#### ForumPosts
- `PostId`, `Title`, `Content`, `UserId`, `Category`, `CreatedAt`
- ↪ `UserId → Users`

#### ForumReplies
- `ReplyId`, `PostId`, `UserId`, `Content`, `CreatedAt`
- ↪ `PostId → ForumPosts`, `UserId → Users`

#### PostVotes
- `VoteId`, `PostId`, `UserId`, `VoteType`
- ↪ `PostId → ForumPosts`, `UserId → Users`

---

## 🧩 File Structure

### Backend (ASP.NET 8 - Web API)

**Authentication and Authorization**
- `AuthController.cs`, `AuthService.cs`, `JwtHelper.cs`, `RoleManager.cs`
- Models: `User.cs`, `Role.cs`

**Certificate Management**
- `CertificateController.cs`, `CertificateService.cs`
- Models: `Certificate.cs`

**Video Management**
- `VideoController.cs`, `VideoService.cs`
- Models: `Video.cs`

**Content Access**
- `ContentController.cs`, `ContentService.cs`

**Reporting**
- `ReportController.cs`, `ReportService.cs`

**User Management**
- `UserController.cs`, `UserService.cs`

**Quiz Module**
- `QuizController.cs`, `QuizService.cs`
- Models: `Quiz.cs`, `Question.cs`, `QuizAttempt.cs`

**Community Forum**
- `ForumController.cs`, `ForumService.cs`
- Models: `ForumPost.cs`, `ForumReply.cs`, `PostVote.cs`

**Comment and Like System**
- `CommentController.cs`, `LikeController.cs`
- Models: `Comment.cs`, `Like.cs`

---

### Frontend (Angular)

**Authentication**
- Components: `login.component.ts`, `register.component.ts`
- Services: `auth.service.ts`

**Certificate Management**
- Components: `upload-certificate.component.ts`, `approve-certificate.component.ts`
- Services: `certificate.service.ts`

**Video Management**
- Components: `upload-video.component.ts`, `approve-video.component.ts`, `view-videos.component.ts`
- Services: `video.service.ts`

**Content Access**
- Components: `content-list.component.ts`
- Services: `content.service.ts`

**Reporting**
- Components: `report.component.ts`
- Services: `report.service.ts`

**User Management**
- Components: `manage-users.component.ts`
- Services: `user.service.ts`

**Quiz Module**
- Components: `quiz-list.component.ts`, `quiz-detail.component.ts`, `quiz-history.component.ts`
- Services: `quiz.service.ts`

**Community Forum**
- Components: `forum-list.component.ts`, `forum-detail.component.ts`, `forum-create.component.ts`
- Services: `forum.service.ts`

**Comment and Like System**
- Components: `comment-section.component.ts`, `like-button.component.ts`
- Services: `comment.service.ts`, `like.service.ts`

---

## 📦 Summary

- **Backend**: ~30 files (Controllers, Services, Models)
- **Frontend**: ~25 Components, ~10 Services
- **Database**: 12 Tables
