import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, getDocs, setDoc, collection, query, where, Timestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGnbihxjFk9mINdjgLFDCKzUdZVdukGQ0",
  authDomain: "basketball-playlist.firebaseapp.com",
  projectId: "basketball-playlist",
  storageBucket: "basketball-playlist.appspot.com",
  messagingSenderId: "163979059465",
  appId: "1:163979059465:web:cb96f5b97736b225d6f3d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let createVideoPlaylist = (videosInfo) => {
  let playlist = Object.keys(videosInfo).map(key => { return {title: key, url: videosInfo[key]}});
  return playlist.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
};

let getBallersVideos = async(baller) => {
  console.log(baller);
    const ballerRef = doc(db, "users", baller);
    const ballerInfo = await getDoc(ballerRef);
    console.log(ballerInfo);
    let videos = [];
    if (ballerInfo.exists()) {
      const ballerPresence = ballerInfo.data().presence.sort(function(a,b) {
        a = a.split('-').reverse().join('');
        b = b.split('-').reverse().join('');
        return b.localeCompare(a);
      });
      console.log(ballerPresence)
      for (let index = 0; index < ballerPresence.length; index++) {
        const presenceDay = ballerPresence[index];
        const videoInfo = await getDoc(doc(db, "videos", presenceDay));
        if (videoInfo.data()) {
          videos.push({playlist: createVideoPlaylist(videoInfo.data()), date: videoInfo.id});
        }
      }
      } else {
        console.log("No such document!");
      }
      return videos;
}
export { getBallersVideos };
