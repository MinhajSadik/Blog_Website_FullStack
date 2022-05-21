import moment from "moment";
import React from "react";

const Reply = ({ reply }) => {
  return (
    <div key={reply._id}>
      <div class="card p-3">
        <div class="d-flex justify-content-between align-items-center">
          <div class="user d-flex flex-row align-items-center">
            <span>
              <small class="font-weight-bold text-primary">
                {reply.author.name}
              </small>{" "}
              <small class="font-weight-bold">{reply.reply}</small>
            </span>
          </div>
          <small>{moment(reply.createdAt).startOf().fromNow()} </small>
        </div>
        <div class="action d-flex justify-content-between mt-2 align-items-center">
          <div class="reply px-4">{reply && <button>Reply</button>}</div>
        </div>
      </div>
    </div>
  );
};

export default Reply;
