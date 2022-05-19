import axios from 'axios';
import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { useQuery } from 'react-query';
import auth from '../../firebase.init';
import Loading from '../Shared/Loading';
import Navbar from '../Shared/Navbar';

const MyTask = () => {
  const [user] = useAuthState(auth);
  const { isLoading, error, data, refetch } = useQuery('myTask', () =>
    fetch(
      `https://secret-castle-68433.herokuapp.com/tasks?email=${user.email}`
    ).then((res) => res.json())
  );

  if (isLoading) return <Loading />;

  if (error) return toast.error(`An error has occurred: ${error.message}`);

  const deletion = (id) => {
    confirmAlert({
      title: (
        <span className="text-3xl text-semibold text-red-600">
          Confirm Deletion
        </span>
      ),
      message: (
        <span className="text-md">Are you sure to delete the item?</span>
      ),
      buttons: [
        {
          label: <span className="mr-2 w-1/2">No</span>,
          onClick: () => toast.error('Canceled by you'),
        },
        {
          label: <span className=" w-1/2">Yes, Delete it!</span>,
          onClick: () => handleDelete(id),
        },
      ],
    });
  };

  const handleDelete = (id) => {
    const url = `https://secret-castle-68433.herokuapp.com/task/${id}`;

    fetch(url, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success('Deleted the item successfully...');
        }
      });
  };

  const handleUpdate = (id) => {
    const url = `https://secret-castle-68433.herokuapp.com/task/${id}`;
    axios
      .put(url, {
        done: true,
      })
      .then((res) => {
        refetch();
      });
  };

  return (
    <>
      <Navbar />
      <section
        style={{ maxWidth: '1200px', minHeight: '70vh' }}
        className="mx-auto"
      >
        <h1 className="text-4xl font-bold text-center text-accent mb-5 mt-10 md:mt-16">
          Hi {user?.displayName}, your all important task is here...
        </h1>

        <div className="my-5">
          <div class="overflow-x-auto rounded-2xl">
            <table class="table table-zebra w-full text-center">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Job</th>
                  <th>Favorite Color</th>
                </tr>
              </thead>
              {data.map((task, index) => (
                <tbody key={task._id}>
                  <tr className="text-center">
                    <th
                      className={`${
                        task.done ? 'line-through bg-green-500' : 'no-underline'
                      }`}
                    >
                      {index + 1}
                    </th>
                    <td
                      className={`${
                        task.done ? 'line-through bg-green-500' : 'no-underline'
                      }`}
                    >
                      {task.name}
                    </td>
                    <td
                      className={`${
                        task.done ? 'line-through bg-green-500' : 'no-underline'
                      }`}
                    >
                      {task.des}
                    </td>
                    <td className="text-center">
                      {!task.done ? (
                        <button
                          onClick={() => handleUpdate(task._id)}
                          class="btn btn-outline btn-success mr-2"
                        >
                          Done
                        </button>
                      ) : (
                        <button
                          disabled
                          onClick={() => handleUpdate(task._id)}
                          class="btn btn-outline btn-success mr-2"
                        >
                          Done
                        </button>
                      )}
                      <button
                        onClick={() => deletion(task._id)}
                        class="btn btn-outline btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default MyTask;
