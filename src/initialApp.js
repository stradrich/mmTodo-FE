export default function todoList() {
  return (
      <div>
          <div>
             To Do List
              <button>+</button>
              <button>...</button>
              <div>
                <span>
                  <button>X</button>
                  <p>Delete Entire List</p>
                </span>
              </div>
          </div>
          <ul>
              <li>test</li>
              <input type='checkbox'/>
              <button>...</button>
              <div>
              <span>
                  <button>O</button>
                  <p>Edit item</p>
              </span>
              <span>
                  <button>O</button>
                  <p>Delete item</p>
              </span>
              </div>
          </ul>
          <div>
            <form>
                <input placeholder="What needs to be done?"/>
                <div>
                  <button>Create</button>
                  <button>Cancel</button>
                </div>
            </form>
          </div>
          <span>Don't miss out on important tasks anymore</span>
      </div>
  )
}