import { atom, selector } from 'recoil';

const studyRoomAtoms = {
  studyRoomId: atom({
    key: 'studyRoomId',
    default: '',
  }),

  userInfo: atom({
    key: 'userInfo',
    default: null,
  }),

  userNickName: atom({
    key: 'userNickName',
    default: '',
  }),

  userTimer: atom({
    key: 'userTimer',
    default: new Map(),
  }),

  PCs: atom({
    key: 'PCs',
    default: new Map(),
  }),

  RTCSenders: atom({
    key: 'RTCSenders',
    default: new Map(),
  }),

  connectedUsers: atom({
    key: 'connnectedUsers',
    default: [],
  }),

  connectedUserTimer: atom({
    key: 'connectedUserTimer',
    default: new Map(),
  }),

  userAudioMute: atom({
    key: 'userAudioMute',
    default: new Map(),
  }),

  userVideoMute: atom({
    key: 'userVideoMute',
    default: new Map(),
  }),
};

const studyRoomSelectors = {
  // getTimerFormat: selector({
  //   key: 'getTimerFormat',
  //   get: ({  }) => {
  //     const seconds = get(this.studyRoomAtoms.userTimer);
  //     var hour =
  //       parseInt(seconds / 3600) < 10 ? '0' + parseInt(seconds / 3600) : parseInt(seconds / 3600);
  //     var min =
  //       parseInt((seconds % 3600) / 60) < 10
  //         ? '0' + parseInt((seconds % 3600) / 60)
  //         : parseInt((seconds % 3600) / 60);
  //     var sec = seconds % 60 < 10 ? '0' + (seconds % 60) : seconds % 60;
  //     return hour + ':' + min + ':' + sec;
  //   },
  // }),
};

// const studyRoomAPIs = {
//   getTimerFormat: selector({
//     key: 'getTimerFormat',
//     get: (seconds) => {
//       var hour =
//         parseInt(seconds / 3600) < 10 ? '0' + parseInt(seconds / 3600) : parseInt(seconds / 3600);
//       var min =
//         parseInt((seconds % 3600) / 60) < 10
//           ? '0' + parseInt((seconds % 3600) / 60)
//           : parseInt((seconds % 3600) / 60);
//       var sec = seconds % 60 < 10 ? '0' + (seconds % 60) : seconds % 60;
//       return hour + ':' + min + ':' + sec;
//     },
//   }),
// };

export { studyRoomAtoms, studyRoomSelectors };
