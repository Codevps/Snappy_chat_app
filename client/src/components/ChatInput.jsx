import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import FileBase from "react-file-base64";

export default function ChatInput({ handleSendMsg }) {
  const [msg, setMsg] = useState({
    text: "",
    selectedFile: "",
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg.text;
    message += emojiObject.emoji;
    setMsg({ ...msg, text: message });
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.text.length > 0 || msg.selectedFile.length > 0) {
      const nachos = [msg.text, msg.selectedFile];
      handleSendMsg(nachos);
      setMsg({ text: "", selectedFile: "" });
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div>
          <HiOutlineFolderAdd className="add" />
        </div>
        <div
          style={{
            position: "relative",
            right: "16rem",
            opacity: "0",
          }}
        >
          {
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => setMsg({ ...msg, selectedFile: base64 })}
            />
          }
        </div>
        <div
          style={{
            position: "relative",
            left: "-17rem",
            marginTop: "0.1rem",
          }}
        >
          <div className="emoji">
            <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
            {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
          </div>
        </div>
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <div></div>
        {msg?.selectedFile && (
          <div
            style={{
              backgroundColor: "#ffffff34",
              marginLeft: "2rem",
              position: "absolute",
              color: "white",
              height: "25rem",
              width: "40%",
              bottom: "10rem",
              border: "1px solid gray",
              borderRadius: "1rem",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              display: "flex",
              zIndex: "1500",
            }}
          >
            <div>
              <img
                style={{ height: "20rem", width: "auto" }}
                src={msg.selectedFile}
                alt=""
              />
            </div>
            <div
              style={{
                fontFamily: "arial",
                fontSize: "1.5rem",
                position: "absolute",
                top: "-0rem",
                right: "1rem",
                padding: "0.5rem",
                cursor: "pointer",
                color: "white",
              }}
              onClick={() => setMsg({ ...msg, selectedFile: "" })}
            >
              x
            </div>
          </div>
        )}
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg({ ...msg, text: e.target.value })}
          value={msg.text}
        />
        <button
          type="submit"
          disabled={
            msg?.text?.length <= 0 && msg?.selectedFile?.length <= 0 && true
          }
        >
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .add {
      font-size: 1.8rem;
      &:hover {
        color: plum;
      }
    }
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 2rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
