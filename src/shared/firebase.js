//1.파이어베이스 설치 후 필요한 것 임포트
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

//2. 홈페이지에서 sdk가져오기
const firebaseConfig = {
    apiKey: "AIzaSyD8nP_Wqsxm0flgQOyNgynIRhSS5jgKMVU",
    authDomain: "react-homework1.firebaseapp.com",
    projectId: "react-homework1",
    storageBucket: "react-homework1.appspot.com",
    messagingSenderId: "905788861301",
    appId: "1:905788861301:web:0f171d05bad9314a10413c",
    measurementId: "G-JJE80XPM16",
};
//초기화하기
firebase.initializeApp(firebaseConfig);

//인증 선언?
const auth = firebase.auth();
//apiKey쓸 수 있도록 export
const apiKey = firebaseConfig.apiKey;
//파이어베이스 선언
const firestore = firebase.firestore();
//파이어베이스 스토리지 선언
const storage = firebase.storage();

export { auth, apiKey, firestore, storage };
