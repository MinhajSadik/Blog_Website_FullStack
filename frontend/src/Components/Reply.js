import moment from "moment";
import React from "react";

const Reply = ({ reply, comment }) => {
  return (
    <div key={reply._id}>
      <div className="card p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="user d-flex flex-row align-items-center">
            <span>
              <small className="font-weight-bold text-primary d-flex">
                {comment?.author?.name}
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
