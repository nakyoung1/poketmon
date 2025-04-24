import { useState, useEffect, useContext } from "react";
import {
     getFirestore,
     collection,
     addDoc,
     query,
     where,
     onSnapshot,
     serverTimestamp,
     orderBy,
     doc,
     deleteDoc,
     updateDoc,
} from "firebase/firestore";
import { LoginStateContext } from "../Context/Login_context";
import { ThemeToggleBtnContext } from "../Context/ThemeToggleBtn";
import { LangToggleBtnContext } from "../Context/LangToggleBtn";
import "../styles/Comment.css";
import { useNavigate } from "react-router-dom";

function Comment({ pokemonId }) {
     const db = getFirestore();
     const { user, loginState } = useContext(LoginStateContext);
     const [comment, setComment] = useState("");
     const [comments, setComments] = useState([]);
     const [editingId, setEditingId] = useState(null);
     const [editedText, setEditedText] = useState("");
     const { isDark } = useContext(ThemeToggleBtnContext);
     const { lang } = useContext(LangToggleBtnContext);
     const navigate = useNavigate();

     useEffect(() => {
          const q = query(
               collection(db, "comments"),
               where("pokemonId", "==", pokemonId),
               orderBy("localCreatedAt", "asc")
          );
          const unsubscribe = onSnapshot(q, (snapshot) => {
               const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
               }));
               setComments(data);
          });
          return () => unsubscribe();
     }, [pokemonId]);

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (!user)
               return alert(
                    lang === "kor"
                         ? "로그인 후 댓글을 작성할 수 있어요!"
                         : "You must log in to post comments."
               );
          if (comment.trim() === "")
               return alert(
                    lang === "kor"
                         ? "댓글을 입력해주세요!"
                         : "Please enter a comment!"
               );

          const newComment = {
               pokemonId,
               nickname: user.displayName || user.email,
               text: comment,
               createdAt: serverTimestamp(),
               localCreatedAt: new Date(),
               uid: user.uid,
          };

          await addDoc(collection(db, "comments"), newComment);
          setComment("");
     };

     const handleDelete = async (id) => {
          if (
               window.confirm(
                    lang === "kor"
                         ? "정말 삭제하시겠습니까?"
                         : "Are you sure you want to delete this comment?"
               )
          ) {
               await deleteDoc(doc(db, "comments", id));
          }
     };

     const handleEditStart = (comment) => {
          setEditingId(comment.id);
          setEditedText(comment.text);
     };

     const handleEditSubmit = async (id) => {
          await updateDoc(doc(db, "comments", id), { text: editedText });
          setEditingId(null);
          setEditedText("");
     };

     const formatDate = (timestamp) => {
          if (!timestamp) return "";
          const date =
               typeof timestamp.toDate === "function"
                    ? timestamp.toDate()
                    : new Date(timestamp); // ← 문자열이나 Date면 그대로 처리

          return `${date.getFullYear()}.${
               date.getMonth() + 1
          }.${date.getDate()} ${date
               .getHours()
               .toString()
               .padStart(2, "0")}:${date
               .getMinutes()
               .toString()
               .padStart(2, "0")}`;
     };
     return (
          <div className={`comment-box ${isDark === "dark" ? "darkmode" : ""}`}>
               {loginState ? (
                    <>
                         <form onSubmit={handleSubmit} className="comment-form">
                              <input
                                   value={comment}
                                   onChange={(e) => setComment(e.target.value)}
                                   placeholder={
                                        lang === "kor"
                                             ? "댓글을 입력하세요"
                                             : "Enter a comment"
                                   }
                              />
                              <button type="submit">등록</button>
                         </form>

                         <ul className="comment-list">
                              {comments.length === 0 ? (
                                   <p className="no-comment">
                                        {lang === "kor"
                                             ? "아직 댓글이 없어요!"
                                             : "No comments yet!"}
                                   </p>
                              ) : (
                                   comments.map((c) => (
                                        <li key={c.id}>
                                             <div className="comment-header">
                                                  <strong>{c.nickname}</strong>
                                                  <span className="comment-time">
                                                       {formatDate(
                                                            c.localCreatedAt
                                                       )}
                                                  </span>
                                             </div>
                                             {editingId === c.id ? (
                                                  <>
                                                       <input
                                                            className="edit-input"
                                                            value={editedText}
                                                            onChange={(e) =>
                                                                 setEditedText(
                                                                      e.target
                                                                           .value
                                                                 )
                                                            }
                                                       />
                                                       <div className="edit-actions">
                                                            <button
                                                                 onClick={() =>
                                                                      handleEditSubmit(
                                                                           c.id
                                                                      )
                                                                 }
                                                            >
                                                                 {lang === "kor"
                                                                      ? "저장"
                                                                      : "Save"}
                                                            </button>
                                                            <button
                                                                 onClick={() =>
                                                                      setEditingId(
                                                                           null
                                                                      )
                                                                 }
                                                            >
                                                                 {lang === "kor"
                                                                      ? "취소"
                                                                      : "Cancel"}
                                                            </button>
                                                       </div>
                                                  </>
                                             ) : (
                                                  <>
                                                       <p>{c.text}</p>
                                                       {user?.uid === c.uid && (
                                                            <div className="comment-actions">
                                                                 <button
                                                                      onClick={() =>
                                                                           handleEditStart(
                                                                                c
                                                                           )
                                                                      }
                                                                 >
                                                                      {lang ===
                                                                      "kor"
                                                                           ? "수정"
                                                                           : "Edit"}
                                                                 </button>
                                                                 <button
                                                                      onClick={() =>
                                                                           handleDelete(
                                                                                c.id
                                                                           )
                                                                      }
                                                                 >
                                                                      {lang ===
                                                                      "kor"
                                                                           ? "삭제"
                                                                           : "Delete"}
                                                                 </button>
                                                            </div>
                                                       )}
                                                  </>
                                             )}
                                        </li>
                                   ))
                              )}
                         </ul>
                    </>
               ) : (
                    <div className="login-required-msg">
                         <p>
                              {lang === "kor"
                                   ? "로그인 후 댓글을 입력할 수 있습니다."
                                   : "You must log in to post comments."}
                         </p>
                         <button
                              className="login-btn"
                              onClick={() => navigate("/login")}
                         >
                              {lang === "kor"
                                   ? "로그인하러 가기"
                                   : "Go to Login"}
                         </button>
                    </div>
               )}
          </div>
     );
}

export default Comment;
