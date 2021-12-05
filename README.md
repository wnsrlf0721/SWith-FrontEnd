# SWith-FrontEnd
#### 2021-2 AJOU Univ. SoftWare Capstone Project  
<div align="center">
  <a href="https://github.com/Andante-SWith/SWith-FrontEnd.git">
<img src="https://user-images.githubusercontent.com/48828625/144738454-4902c569-64ac-4a1c-8f9b-159ba0735905.png" alt="swith logo" width="240" height="80">
  </a>
</div>  

----------------------------------------------------------------
## 목차
[1. 개요](#1-개요)  
[2. 시스템 개요](#2-시스템-개요)  
[3. 빌드](#3-빌드)  
[4. 페이지 구성](#4-페이지-구성)  
[5. 소개 영상](#5-소개-영상)  
## 1. 개요
> 기존에 온라인으로 다른사람과 함께 공부를 한다는 것은 여러 문제점들이 있습니다.  
먼저, 함께 공부할 사람을 찾기 위해선 특정 커뮤니티에 가입해 원하는 공부목적을 가진 사람들을 모아야 하지만 쉽게 찾기가 어렵습니다.
또한 Zoom과 Google Meet 같은 화상회의 플랫폼은 다른사람의 초대나 입장 권한을 받아야 참가할 수 있어 단순 공부만을 하는 데엔 불편함이 있으며,
공부계획을 세울 때 함께 공부하는 사람들의 공부법을 참고하기 힘듭니다.
따라서 이러한 문제를 해결하기 위해 SWith은 함께 공부할 사람을 모으고 관리할 수 있도록 커뮤니티 서비스를 제공합니다.
또한 WebRTC 기반의 화상공유 플랫폼으로 다른 사람들과 실시간 소통을 할 수 있고, 자유롭게 누구나 참여가 가능합니다.
학습관리 서비스로 자신의 공부방법을 세울 수 있으며, 다른 사람들의 공부방식도 참고할 수 있습니다.
## 2. 시스템 개요

<div align="center"><img src="https://user-images.githubusercontent.com/55420438/144746701-c06ab59d-0e0d-4d77-add3-b4a5998bb6cd.png" alt="systemOverview"></div>
* Jenkins를 이용하여 빌드 및 배포 자동화를 구현했습니다.

* webRTC를 이용한 화상 공유를 구현하여 SDK를
이용해 구현한 것과 다르게 추가 비용이 들지 않았습니다.

* webRTC 통신 구조 중 Mesh구조를 선택하여 높은
실시간성을 보장합니다.

* 웹앱 기반의 캘린더 오픈소스인 FullCalendar와
그래프 오픈소스인 ApexCharts를 이용하여
사용자에게 학습 관리 및 학습 통계에 대한 편의성
제공하였습니다.
## 3. 빌드
* Clone
```
git clone https://github.com/Andante-SWith/SWith-FrontEnd.git
```

* Change Directory
```
cd frontend
```

* Install
```
yarn install
```

* Start
```
yarn start
```
## 4. 페이지 구성

### 1. 메인페이지


![홈화면](https://user-images.githubusercontent.com/72532944/144746343-90a6c5b6-2b1c-4ced-b09d-fa23dd56c3f6.png)

#### ** 내 스터디
![내 스터디](https://user-images.githubusercontent.com/72532944/144746321-e553344c-acbf-4e94-b191-dbe93953d995.png)

#### ** 스터디 목록
![스터디목록](https://user-images.githubusercontent.com/72532944/144746334-e896c88b-6bb7-4fce-9b2c-7a720b8cf73e.png)

### 2. 로그인 페이지
![로그인](https://user-images.githubusercontent.com/72532944/144746325-e63fbd0f-af67-4402-993c-3e6a99ef1bc1.png)

### 3. 회원가입 페이지
![회원가입](https://user-images.githubusercontent.com/72532944/144746344-92e5d9d4-3870-4b85-81fb-7b75b0b8ebaa.png)


### 4. 프로필 페이지


![프로필](https://user-images.githubusercontent.com/72532944/144746339-584a482e-0dde-499d-9a84-399d4f9726ac.png)

#### ** 프로필 편집 
![프로필 편집](https://user-images.githubusercontent.com/72532944/144746338-c4028bab-a57e-412a-b31f-4ba99c8f9105.png)

### 5.. 스터디룸 페이지


![스터디룸](https://user-images.githubusercontent.com/72532944/144746331-1dd9b11b-2f69-48fd-b9dc-fc84b1adb2d9.png)


![스터디룸2](https://user-images.githubusercontent.com/72532944/144746332-f066dfdd-a61d-408e-a3a9-f59b90f548ad.png)


#### ** 스터디룸 만들기
![스터디 만들기](https://user-images.githubusercontent.com/72532944/144746326-0cf97491-c330-46b9-8d77-db34fd648543.png)

#### ** 스터디룸 설정 수정
이미지

### 6. 학습관리 페이지


#### ** 캘린더
![학습관리-캘린더](https://user-images.githubusercontent.com/72532944/144746341-c9bf9359-166f-43ee-bf40-655e9ab6aa37.png)


#### * 통계
![학습관리-통계](https://user-images.githubusercontent.com/72532944/144746342-4a402be1-c6c5-4f7a-b940-9ca75fa4ab97.png)

### 7. 커뮤니티 페이지


#### ** 게시글 목록
![커뮤니티](https://user-images.githubusercontent.com/72532944/144746337-c3097871-f057-49db-82a6-d1a2bf4efaff.png)

#### ** 게시글
![게시글](https://user-images.githubusercontent.com/72532944/144746320-c0c08fc1-5862-45bb-96da-4510eff02bdf.png)

#### ** 게시글 작성
![게시글 작성](https://user-images.githubusercontent.com/72532944/144746319-3205943e-f07e-4b16-a156-578380b2636b.png)

## 5. 소개 영상
https://softcon.ajou.ac.kr/works/works.asp?uid=487
