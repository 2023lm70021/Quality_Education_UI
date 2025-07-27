
5.1 Use Case Diagram
+---------------------------------------------------------------+
|                    EduVidShare System                         |
+---------------------------------------------------------------+
|                                                               |
|  +---------+                                  +-----------+   |
|  | Student |                                  |  Teacher  |   |
|  +---------+                                  +-----------+   |
|     |                                              |          |
|     |-- Register/Login                             |-- Register/Login|
|     |-- Browse Videos                              |-- Upload Certificate|
|     |-- Watch Videos                               |-- Upload Videos    |
|     |-- Like Videos                                |-- Manage Videos    |
|     |-- Comment on Videos                          |-- View Analytics   |
|     |-- Download Videos                            |-- Respond to Comments|
|     |                                              |                     |
|     |                                              |                     |
|  +---------+                                                             |
|  |  Admin  |                                                             |
|  +---------+                                                             |
|     |                                                                    |
|     |-- Manage Users                                                     |
|     |-- Approve/Reject Certificates                                      |
|     |-- Approve/Reject Videos                                            |
|     |-- Moderate Comments                                                |
|     |-- View System Analytics                                            |
|                                                                          |
+--------------------------------------------------------------------------+

5.2 Activity Diagram - Certificate Approval Process
+-------------------+     +------------------+     +------------------------+
| Teacher uploads   |---->| Admin reviews    |---->| System notifies        |
| certificate       |     | certificate      |     | teacher of decision    |
+-------------------+     +------------------+     +------------------------+
                            |            |
                            |            |
                      +-----+            +------+
                      |                         |
          +-----------v----------+    +---------v-----------+
          | Certificate          |    | Certificate         |
          | approved             |    | rejected            |
          +----------------------+    +---------------------+
                     |                          |
                     v                          v
        +------------------------+    +-------------------+
        | Teacher role granted   |    | Teacher can       |
        | Can upload videos      |    | submit new        |
        +------------------------+    | certificate |
      5.4 Sequence Diagram - Video Upload and Approval                                +-------------------+
+--------+         +---------+         +--------+         +--------+
|Teacher |         |  API    |         |Database|         | Admin  |
+--------+         +---------+         +--------+         +--------+
    |                   |                   |                  |
    | Upload Video      |                   |                  |
    |------------------>|                   |                  |
    |                   | Store Video       |                  |
    |                   |------------------>|                  |
    |                   |                   |                  |
    |                   | Create Record     |                  |
    |                   |------------------>|                  |
    |                   |                   |                  |
    | Response          |                   |                  |
    |<------------------|                   |                  |
    |                   |                   |                  |
    |                   |                   | Request Pending  |
    |                   |                   |<-----------------|
    |                   |                   |                  |
    |                   |                   | Return Videos    |
    |                   |                   |----------------->|
    |                   |                   |                  |
    |                   |                   | Approve/Reject   |
    |                   |                   |<-----------------|
    |                   |                   |                  |
    |                   |                   | Update Status    |
    |                   |                   |----------------->|
    |                   |                   |                  |
    | Notification      |                   |                  |
    |<------------------|                   |                  |

    5.5 Data Modeling - Entity Relationship Diagram
+----------------+       +----------------+       +---------------+
|     Users      |       |    Videos      |       |  Certificates |
+----------------+       +----------------+       +---------------+
| PK: UserId |< ----->| PK: VideoId |       | PK: CertId |
| Username |       | FK: UserId |       | FK: UserId |
| PasswordHash |       | Title |       | Title |
| Email |       | Description |       | Description |
| FK: RoleId |       | FilePath |       | FilePath |
+----------------+       | FileType |       | FileType |
       ^                 | UploadDate |       | FileContent |
       |                 | Status |       | UploadDate |
       |                 | AdminRemarks |       | Status |
       |                 | ApprovalDate |       | AdminRemarks |
       |                 | ViewCount |       | ApprovalDate |
+----------------+ +----------------+ +---------------+
| Roles | ^+----------------+              |
| PK: RoleId |              |
| RoleName |              | +---------------+
+----------------+              |                 | VideoComments |
                                +----------------> +---------------+
                                |                 | PK: CommentId |
                                |                 | FK: VideoId |
                                |                 | FK: UserId |
                                |                 | Content |
                                |                 | CommentDate |
                                | +---------------+
                                |
                                | +---------------+
                                +---------------->| VideoLikes |
                                                  +---------------+
                                                  | PK: LikeId |
                                                  | FK: VideoId |
                                                  | FK: UserId |
                                                  | LikeDate |
                                                  +---------------+


5.6 Class Diagram

+-------------------+         +-------------------+         +-------------------+
|      User         |         |      Video        |         |    Certificate    |
+-------------------+         +-------------------+         +-------------------+
| - UserId: int     |<------->| - VideoId: int    |         | - CertId: int     |
| - Username: string|         | - UserId: int     |         | - UserId: int     |
| - PasswordHash: str |        | -Title: string   |         | - Title: string   |
| - Email: string   |         | - Description: str |         | -Description: str |
| -RoleId: int     |         | - FilePath: string|         | - FilePath: string|
+-------------------+         | - FileType: string|         | - FileType: string|
                              | - UploadDate: date |         | -FileContent: blob |
+-------------------+         | -Status: int     |         | - UploadDate: date |
| Role |         | -AdminRemarks: str |        | -Status: int     |
+-------------------+         | - ApprovalDate: dt |         | -AdminRemarks: str |
| -RoleId: int     |         | - ViewCount: int  |         | - ApprovalDate: dt |
| -RoleName: string|         +-------------------+         +-------------------+
+-------------------+                  ^                           ^
                                       |                           |
                                       |                           |
                                       |                           |
                   +-------------------+                           |
                   |                   |                           |
      +------------v---------+  +------v-------------+             |
      |    VideoComment      |  |     VideoLike      |             |
      +----------------------+  +--------------------+             |
      | - CommentId: int     |  | - LikeId: int      |             |
      | - VideoId: int       |  | - VideoId: int     |             |
      | - UserId: int        |  | - UserId: int      |             |
      | - Content: string    |  | - LikeDate: date |             |
      | -CommentDate: date | +--------------------+             |
      +----------------------+                                     |
                                                                   |
                                              +---------+----------+
                                              |         |
                                              v         v
                               + ------------+ +------------------+
                               | Controllers | | Services |
                               +------------+ +------------------+
                               | AuthController | UserService |
                               | VideoController |                |
                               | CertController |                 |
                               | CommentContr. |                 |
                               | LikeController |                 |
                               +------------+ +------------------+


5.9 Data Flow Diagram - Level 0
+---------------------------------------------------------------------+
|                       EduVidShare Application                        |
+---------------------------------------------------------------------+
|                                                                     |
|  +----------------+     +----------------+     +----------------+   |
|  |  Authentication|     |   User         |     |  Admin         |   |
|  |  Component     |     |   Component    |     |  Component     |   |
|  +----------------+     +----------------+     +----------------+   |
|  | - Login        |     | - Profile      |     | - User Mgmt    |   |
|  | - Register     |     | - Dashboard    |     | - Content      |   |
|  | - JWT          |     | - Settings     |     |   Approval     |   |
|  +----------------+     +----------------+     +----------------+   |
|                                                                     |
|  +----------------+     +----------------+     +----------------+   |
|  |   Video        |     |  Certificate   |     |  Social        |   |
|  |   Component    |     |  Component     |     |  Component     |   |
|  +----------------+     +----------------+     +----------------+   |
|  | - Upload       |     | - Upload       |     | - Comments     |   |
|  | - Streaming    |     | - Verification |     | - Likes        |   |
|  | - Management   |     | - Management   |     | - Notifications|   |
|  +----------------+     +----------------+     +----------------+   |
|                                                                     |
+---------------------------------------------------------------------+
                                  |
                                  |
                                  v
+---------------------------------------------------------------------+
|                           API Layer                                  |
+---------------------------------------------------------------------+
                                  |
                                  |
                                  v
+---------------------------------------------------------------------+
|                       Data Access Layer                              |
+---------------------------------------------------------------------+
                                  |
                                  |
                                  v
+---------------------------------------------------------------------+
|                          Database                                    |
+---------------------------------------------------------------------+
+-------------------+           +-------------------+
|   Client Device   |           |  CDN/Storage      |
+-------------------+           +-------------------+
| - Web Browser     |<--------->| - Video Files     |
| - Mobile App      |           | - Certificate Files|
+-------------------+           +-------------------+
         |                               ^
         | HTTPS                         |
         v                               |
+-------------------+           +-------------------+
|  Web Server       |---------->|  Database Server  |
+-------------------+           +-------------------+
| - ASP.NET Core    |           | - SQL Server      |
| - API Controllers |           | - User Data       |
| - Services        |           | - Metadata        |
+-------------------+           +-------------------+

    5.9 Data Flow Diagram - Level 1

  
                                  +------------+
                            |            |
               +----------->|  User      |<-----------+
               |            |Management  |            |
               |            |            |            |
               |            +------------+            |
               |                                      |
               |                                      |
+------------+ |            +------------+            | +------------+
|            | |            |            |            | |            |
|  Student   |-+----------->|  Video     |<-----------+-|  Teacher   |
|            |              |Management  |              |            |
+------------+              |            |              +------------+
               +----------->|            |<-----------+
               |            +------------+            |
               |                                      |
               |                                      |
               |            +------------+            |
               |            |            |            |
               +----------->|Certificate |            |
                            |Management  |<-----------+
                            |            |
                            +------------+
                                   ^
                                   |
                                   |
                                   v
                            +------------+
                            |            |
                            |Administrator|
                            |            |
                            +------------+                     