import moment from "moment";
import React from "react";

const Reply = ({ reply }) => {
  console.log(reply);
  return (
    <div key={reply._id}>
      <div
        style={{
          width: "95%",
          marginLeft: "5%",
          background: "#3a3b3c",
          color: "white",
        }}
        className="card p-2"
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="user d-flex flex-row align-items-center">
            <span>
              <small className="font-weight-bold text-primary d-flex">
                {reply?.author?.name}
              </small>
              <p className="font-weight-bold">{reply.reply}</p>
            </span>
          </div>
          <small>{moment(reply.createdAt).startOf().fromNow()} </small>
        </div>
        <div className="action d-flex justify-content-between mt-2 align-items-center">
          {/* <div className="reply px-4"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Reply;
