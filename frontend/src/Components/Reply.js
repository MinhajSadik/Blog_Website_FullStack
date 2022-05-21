import moment from "moment";
import React from "react";

const Reply = ({ reply }) => {
  return (
    <div key={reply._id}>
      <div className="card p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="user d-flex flex-row align-items-center">
            <span>
              <small className="font-weight-bold text-primary">
                {reply?.author?.name}
              </small>{" "}
              <small className="font-weight-bold">{reply.reply}</small>
            </span>
          </div>
          <small>{moment(reply.createdAt).startOf().fromNow()} </small>
        </div>
        <div className="action d-flex justify-content-between mt-2 align-items-center">
          <div className="reply px-4">{reply && <button>Reply</button>}</div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
