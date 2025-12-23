# QPoint Backend Changes Summary

## Fixed Issues

### 1. Login Issue - Fixed OTP being sent for invalid passwords
- **Problem**: System was sending OTP even when the password was wrong
- **Solution**: Added a new `/auth/login` endpoint that validates email and password before sending OTP
- **Files Modified**:
  - `src/main/java/com/example/Qpoint/controller/AuthController.java` - Added login endpoint
  - `src/main/java/com/example/Qpoint/service/OtpService.java` - Added `validateCredentials` method

### 2. Username Validation - Enhanced username requirements
- **Problem**: Username field existed but lacked proper validation
- **Solution**: Added validation constraints to ensure usernames meet requirements
- **Files Modified**:
  - `src/main/java/com/example/Qpoint/models/User.java` - Added @Size and @Pattern validation
  - `src/main/java/com/example/Qpoint/dto/VerifyOtpRequest.java` - Added validation annotations

## New Features Implemented

### 1. User Profile Management
- **Feature**: Allow users to update their profile information
- **Files Created**:
  - Added `updateProfile` endpoint to `UserController`
  - Enhanced `UserService` with `updateUserProfile` method

### 2. Like Functionality
- **Feature**: Enable users to like posts and comments
- **Files Created**:
  - `src/main/java/com/example/Qpoint/models/Like.java` - Entity for post likes
  - `src/main/java/com/example/Qpoint/models/CommentLike.java` - Entity for comment likes
  - `src/main/java/com/example/Qpoint/repository/LikeRepository.java` - Repository for post likes
  - `src/main/java/com/example/Qpoint/repository/CommentLikeRepository.java` - Repository for comment likes
  - `src/main/java/com/example/Qpoint/service/LikeService.java` - Service for post likes
  - `src/main/java/com/example/Qpoint/service/CommentLikeService.java` - Service for comment likes
  - `src/main/java/com/example/Qpoint/controller/LikeController.java` - Controller for post likes
  - `src/main/java/com/example/Qpoint/controller/CommentLikeController.java` - Controller for comment likes

### 3. API Endpoint Alignment
- **Feature**: Ensure backend endpoints match frontend expectations
- **Files Modified**:
  - `src/main/java/com/example/Qpoint/controller/FeedController.java` - Added `/api/home/questions` alias for `/api/feed`
  - `src/main/java/com/example/Qpoint/controller/QuestionsController.java` - Created new controller for `/api/questions` endpoints

## Code Cleanup

### 1. Removed Unused Files
- **Action**: Deleted unused `TrendingDto.java` DTO
- **File Removed**: `src/main/java/com/example/Qpoint/dto/TrendingDto.java`

### 2. Cleaned Up Main Application Class
- **Action**: Removed unused `@PropertySource` annotation
- **File Modified**: `src/main/java/com/example/Qpoint/QpointApplication.java`

## Updated Dependencies

Enhanced existing services to properly integrate with new like functionality:
- Removed simple like methods from `PostService` and `CommentService`
- Updated controllers to remove redundant endpoints

## API Endpoints Available

### Authentication
- `POST /auth/login` - Login with email/password (sends OTP if credentials valid)
- `POST /auth/send-otp` - Send OTP for registration or password reset
- `POST /auth/verify-otp` - Verify OTP and complete authentication

### User Management
- `GET /api/users/me` - Get current user profile
- `PUT /api/users/me` - Update current user profile
- `GET /api/users/{id}` - Get specific user profile
- `GET /api/users/{id}/stats` - Get user statistics
- `GET /api/users/suggestions` - Get user suggestions
- `POST /api/users/{id}/follow` - Follow a user
- `DELETE /api/users/{id}/follow` - Unfollow a user

### Questions/Posts
- `GET /api/feed` or `GET /api/home/questions` - Get user feed
- `POST /api/questions` - Create a new question
- `GET /api/questions/{id}` - Get specific question
- `DELETE /api/questions/{id}` - Delete a question
- `POST /api/questions/{id}/like` - Like a question
- `DELETE /api/questions/{id}/like` - Unlike a question
- `POST /api/questions/{id}/comment` - Add comment to question
- `GET /api/questions/{id}/comments` - Get comments for question

### Comments
- `POST /api/comments/{id}/like` - Like a comment
- `DELETE /api/comments/{id}/like` - Unlike a comment
- `GET /api/comments/{id}/liked` - Check if comment is liked by current user
- `GET /api/comments/{id}/likes/count` - Get like count for comment

### Bookmarks
- `POST /api/bookmarks/{postId}` - Bookmark a post
- `DELETE /api/bookmarks/{postId}` - Remove bookmark
- `GET /api/bookmarks/me` - Get user's bookmarks

### Topics
- `GET /api/topics` - Get all topics
- `GET /api/topics/{id}` - Get specific topic
- `GET /api/topics/trending` - Get trending topics

### Trending Content
- `GET /api/trending` - Get trending posts
- `GET /api/questions/trending` - Get trending questions