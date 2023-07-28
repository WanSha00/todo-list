(()=>{const e=document.querySelector(".project-list"),t=document.querySelector("[data-new-project-form]"),n=document.querySelector(".new-project-input"),a=document.querySelector(".btn-delete-project"),d=document.querySelector(".btn-new-project"),l=document.querySelector(".todo-content"),o=document.querySelector(".todo-title"),s=document.querySelector(".task-count"),c=document.querySelector(".all-tasks"),r=document.querySelector(".btn-delete-complete"),u=document.getElementById("task-template"),m=document.querySelector(".new-task-form"),p=document.querySelector(".new-task-title-input"),k=document.querySelector(".new-task-date"),y=document.querySelector(".new-task-details"),f=document.getElementsByName("create-new-priority"),S=document.querySelector("#btn-add-task"),v=document.querySelector(".edit-task-form"),g=document.querySelector(".edit-task-title-input"),q=document.querySelector(".edit-task-date"),b=document.querySelector(".edit-task-details"),L=document.getElementsByName("edit-priority");document.querySelector("#btn-edit-task");let h=JSON.parse(localStorage.getItem("project.lists"))||[],w=localStorage.getItem("project.selectedListId"),E="";function j(){const t=document.querySelector(".edit-task-container"),n=document.querySelector(".newtask");t.classList.add("edit-not-active"),n.classList.remove("new-not-active"),function(){a.disabled=!1,r.disabled=!1,d.disabled=!1,S.disabled=!1,document.querySelectorAll(".btn-task-delete").forEach((e=>e.disabled=!1));let e=document.getElementsByTagName("input");for(i=0;i<e.length;i++)"checkbox"==e[i].type&&(e[i].disabled=!1)}(),e.classList.remove("project-list-none")}function I(){localStorage.setItem("project.lists",JSON.stringify(h)),localStorage.setItem("project.selectedListId",w)}function N(){C(e),h.forEach((t=>{const i=document.createElement("li");i.dataset.projId=t.id,i.classList.add("project-list-name"),i.innerText=t.name,t.id===w&&i.classList.add("active-project"),e.appendChild(i)}));const t=h.find((e=>e.id===w));"null"==w||null===w?l.style.display="none":(l.style.display="",o.innerText=t.name,D(t),C(c),function(e){e.tasks.forEach((e=>{const t=document.importNode(u.content,!0),i=t.querySelector(".task-row");"low"==e.priority?i.classList.add("task-low"):"medium"==e.priority?i.classList.add("task-medium"):i.classList.add("task-high");const n=t.querySelector("input");n.id=e.id,n.checked=e.complete;const a=t.querySelector("label");a.htmlFor=e.id,a.append(e.name),t.querySelector(".task-date").append(e.dueDate),t.querySelector(".task-priority").append(e.priority),t.querySelector(".task-notes").append(e.notes),t.querySelector(".btn-task-details").id="details-"+e.id,t.querySelector(".btn-task-edit").id="edit-"+e.id,t.querySelector(".btn-task-delete").id="delete-"+e.id,t.querySelector(".task-details-row").id="row-"+e.id,c.appendChild(t)}))}(t))}function D(e){const t=e.tasks.filter((e=>!e.complete)).length,i=1===t?"task":"tasks";s.innerText=`${t} ${i} remaining`}function C(e){for(;e.firstChild;)e.removeChild(e.firstChild)}e.addEventListener("click",(e=>{"li"===e.target.tagName.toLowerCase()&&(w=e.target.dataset.projId,I(),N())})),c.addEventListener("click",(e=>{if("input"===e.target.tagName.toLowerCase()){const t=h.find((e=>e.id===w));t.tasks.find((t=>t.id===e.target.id)).complete=e.target.checked,I(),D(t)}})),r.addEventListener("click",(e=>{let t=h.find((e=>e.id===w));0===t.tasks.filter((e=>e.complete)).length?alert("No completed task to delete"):(t=h.find((e=>e.id===w)),t.tasks=t.tasks.filter((e=>!e.complete)),I(),N())})),c.addEventListener("click",(e=>{if(e.target.classList.contains("btn-task-details")){const t=e.target.id.split("-");document.getElementById("row-"+t[1]).classList.toggle("active-details")}})),c.addEventListener("click",(t=>{if(t.target.classList.contains("btn-task-edit")){!function(){a.disabled=!0,r.disabled=!0,d.disabled=!0,S.disabled=!0,document.querySelectorAll(".btn-task-delete").forEach((e=>e.disabled=!0));let e=document.getElementsByTagName("input");for(i=0;i<e.length;i++)"checkbox"==e[i].type&&(e[i].disabled=!0)}();let n=t.target.id.split("-");E=n[1];const l=h.find((e=>e.id===w));!function(t){e.classList.add("project-list-none");const n=document.querySelector(".edit-task-container"),a=document.querySelector(".newtask");for(n.classList.remove("edit-not-active"),a.classList.add("new-not-active"),g.value=t.name,b.value=t.notes,q.value=t.dueDate,i=0;i<L.length;i++)L[i].value==t.priority&&(L[i].checked=!0)}(l.tasks.find((e=>e.id===E))),v.addEventListener("submit",(e=>{e.preventDefault();const t=g.value,n=q.value,a=b.value;let d="";for(i=0;i<L.length;i++)L[i].checked&&(d=L[i].value);let o=l.tasks.find((e=>e.id===E));o.name=t,o.notes=a,o.dueDate=n,o.priority=d,I(),j(),N()})),document.querySelector("#btn-cancel-edit-task").addEventListener("click",(()=>{j()}))}})),c.addEventListener("click",(e=>{if(e.target.classList.contains("btn-task-delete")){let t=e.target.id.split("-")[1];const i=h.find((e=>e.id===w));i.tasks=i.tasks.filter((e=>e.id!==t)),I(),N()}})),a.addEventListener("click",(e=>{h=h.filter((e=>e.id!==w)),w=null,I(),N()})),t.addEventListener("submit",(e=>{e.preventDefault();const t=(i=n.value,{id:Date.now().toString(),name:i,tasks:[]});var i;n.value=null,h.push(t),I(),N()})),m.addEventListener("submit",(e=>{if(e.preventDefault(),"null"==w||null===w)return void alert("Please select a project to add the new task.");const t=p.value,n=k.value,a=y.value;let d="";for(i=0;i<f.length;i++)f[i].checked&&(d=f[i].value);if(null==t||""===t)return;const l=(o=t,s=a,c=n,r=d,{id:Date.now().toString(),name:o,complete:!1,dueDate:c,notes:s,priority:r});var o,s,c,r;p.value=null,y.value=null,h.find((e=>e.id===w)).tasks.push(l),I(),N()})),N()})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGdEQUlSLE1BQU1VLEVBQVd6RixFQUFhc0YsTUFDeEJJLEVBQVd6RixFQUFZcUYsTUFDdkJLLEVBQVd6RixFQUFZb0YsTUFDN0IsSUFBSU0sRUFBZSxHQUVuQixJQUFLOUQsRUFBSSxFQUFHQSxFQUFJM0IsRUFBZ0I0QixPQUFRRCxJQUNsQzNCLEVBQWdCMkIsR0FBRzhCLFVBQ3JCZ0MsRUFBZXpGLEVBQWdCMkIsR0FBR3dELE9BSXRDLEdBQWdCLE1BQVpHLEdBQWlDLEtBQWJBLEVBQWlCLE9BRXpDLE1BQU1uQyxHQXVCWVIsRUF2Qk0yQyxFQXVCQXZCLEVBdkJVeUIsRUF1QkhPLEVBdkJhUixFQXVCUC9CLEVBdkJpQmlDLEVBd0IvQyxDQUNMaEQsR0FBSWtELEtBQUtDLE1BQU1DLFdBQ2ZsRCxLQUFNQSxFQUNOZSxVQUFVLEVBQ1ZJLFFBQVNpQyxFQUNUaEMsTUFBT0EsRUFDUFAsU0FBVUEsSUFQZCxJQUFvQmIsRUFBTW9CLEVBQU9nQyxFQUFNdkMsRUF0QnJDM0QsRUFBYXNGLE1BQVEsS0FDckJwRixFQUFZb0YsTUFBUSxLQUVJM0UsRUFBU3NDLE1BQzlCVixHQUFZQSxFQUFRSyxLQUFPNUIsSUFFZHFDLE1BQU00QyxLQUFLM0MsR0FFM0JwQixJQUNBRyxHQUFRLElBa0lWQSxHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3QtbGlzdFwiKTtcbmNvbnN0IG5ld1Byb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltkYXRhLW5ldy1wcm9qZWN0LWZvcm1dXCIpO1xuY29uc3QgbmV3UHJvamVjdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctcHJvamVjdC1pbnB1dFwiKTtcbmNvbnN0IGRlbGV0ZVByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1kZWxldGUtcHJvamVjdFwiKTtcbmNvbnN0IG5ld1Byb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi1uZXctcHJvamVjdFwiKTtcblxuY29uc3QgcHJvamVjdERpc3BsYXlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tY29udGVudFwiKTtcbmNvbnN0IHByb2plY3RUaXRsZUVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tdGl0bGVcIik7XG5jb25zdCB0YXNrc0NvdW50RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1jb3VudFwiKTtcbmNvbnN0IHRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hbGwtdGFza3NcIik7XG5jb25zdCB0YXNrRGVsZXRlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idG4tZGVsZXRlLWNvbXBsZXRlXCIpO1xuXG5jb25zdCB0YXNrVGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2stdGVtcGxhdGVcIik7XG5cbmNvbnN0IG5ld1Rhc2tGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctdGFzay1mb3JtXCIpO1xuY29uc3QgbmV3VGFza0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctdGFzay10aXRsZS1pbnB1dFwiKTtcbmNvbnN0IG5ld1Rhc2tEYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uZXctdGFzay1kYXRlXCIpO1xuY29uc3QgbmV3VGFza05vdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ldy10YXNrLWRldGFpbHNcIik7XG5jb25zdCBuZXdUYXNrUHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcImNyZWF0ZS1uZXctcHJpb3JpdHlcIik7XG5jb25zdCBuZXdUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNidG4tYWRkLXRhc2tcIik7XG5cbmNvbnN0IGVkaXRUYXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZWRpdC10YXNrLWZvcm1cIik7XG5jb25zdCBlZGl0VGFza0lucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lZGl0LXRhc2stdGl0bGUtaW5wdXRcIik7XG5jb25zdCBlZGl0VGFza0RhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVkaXQtdGFzay1kYXRlXCIpO1xuY29uc3QgZWRpdFRhc2tOb3RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lZGl0LXRhc2stZGV0YWlsc1wiKTtcbmNvbnN0IGVkaXRUYXNrUHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZShcImVkaXQtcHJpb3JpdHlcIik7XG5jb25zdCBlZGl0VGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnRuLWVkaXQtdGFza1wiKTtcblxubGV0IHByb2plY3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3QubGlzdHNcIikpIHx8IFtdO1xubGV0IHNlbGVjdGVkUHJvamVjdElkID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0LnNlbGVjdGVkTGlzdElkXCIpO1xubGV0IGlkVG9FZGl0ID0gXCJcIjtcblxuLy91cGRhdGUgc2VsZWN0ZWQgcHJvamVjdFxucHJvamVjdENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgaWYgKGUudGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKSA9PT0gXCJsaVwiKSB7XG4gICAgc2VsZWN0ZWRQcm9qZWN0SWQgPSBlLnRhcmdldC5kYXRhc2V0LnByb2pJZDtcblxuICAgIHNhdmUoKTtcbiAgICByZW5kZXIoKTtcbiAgfVxufSk7XG5cbi8vdXBkYXRlIGluY29tcGxldGUgdGFzayBjb3VudFxudGFza3NDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09IFwiaW5wdXRcIikge1xuICAgIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IHByb2plY3RzLmZpbmQoXG4gICAgICAocHJvamVjdCkgPT4gcHJvamVjdC5pZCA9PT0gc2VsZWN0ZWRQcm9qZWN0SWRcbiAgICApO1xuICAgIGNvbnN0IHNlbGVjdGVkVGFzayA9IHNlbGVjdGVkUHJvamVjdC50YXNrcy5maW5kKFxuICAgICAgKHRhc2spID0+IHRhc2suaWQgPT09IGUudGFyZ2V0LmlkXG4gICAgKTtcbiAgICBzZWxlY3RlZFRhc2suY29tcGxldGUgPSBlLnRhcmdldC5jaGVja2VkO1xuXG4gICAgc2F2ZSgpO1xuICAgIHJlbmRlclRhc2tDb3VudChzZWxlY3RlZFByb2plY3QpO1xuICB9XG59KTtcblxuLy9kZWxldGUgYWxsIGNvbXBsZXRlZCB0YXNrc1xudGFza0RlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgbGV0IHNlbGVjdGVkUHJvamVjdCA9IHByb2plY3RzLmZpbmQoXG4gICAgKHByb2plY3QpID0+IHByb2plY3QuaWQgPT09IHNlbGVjdGVkUHJvamVjdElkXG4gICk7XG4gIGNvbnN0IGNvbXBsZXRlZFRhc2tDb3VudCA9IHNlbGVjdGVkUHJvamVjdC50YXNrcy5maWx0ZXIoXG4gICAgKHRhc2spID0+IHRhc2suY29tcGxldGVcbiAgKS5sZW5ndGg7XG5cbiAgaWYgKGNvbXBsZXRlZFRhc2tDb3VudCA9PT0gMCkge1xuICAgIGFsZXJ0KFwiTm8gY29tcGxldGVkIHRhc2sgdG8gZGVsZXRlXCIpO1xuICB9IGVsc2Uge1xuICAgIHNlbGVjdGVkUHJvamVjdCA9IHByb2plY3RzLmZpbmQoXG4gICAgICAocHJvamVjdCkgPT4gcHJvamVjdC5pZCA9PT0gc2VsZWN0ZWRQcm9qZWN0SWRcbiAgICApO1xuICAgIHNlbGVjdGVkUHJvamVjdC50YXNrcyA9IHNlbGVjdGVkUHJvamVjdC50YXNrcy5maWx0ZXIoXG4gICAgICAodGFzaykgPT4gIXRhc2suY29tcGxldGVcbiAgICApO1xuXG4gICAgc2F2ZSgpO1xuICAgIHJlbmRlcigpO1xuICB9XG59KTtcblxuLy9vcGVuIHNwZWNpZmljIHRhc2sgZGV0YWlsc1xudGFza3NDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJidG4tdGFzay1kZXRhaWxzXCIpKSB7XG4gICAgY29uc3QgaWQgPSBlLnRhcmdldC5pZC5zcGxpdChcIi1cIik7XG4gICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm93LVwiICsgaWRbMV0pO1xuXG4gICAgZGV0YWlscy5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlLWRldGFpbHNcIik7XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBkaXNhYmxlTW9kZSgpIHtcbiAgZGVsZXRlUHJvamVjdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gIHRhc2tEZWxldGVCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICBuZXdQcm9qZWN0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcbiAgbmV3VGFza0J1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG5cbiAgbGV0IGRlbGV0ZVRhc2tCdXR0b25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5idG4tdGFzay1kZWxldGVcIik7XG4gIGRlbGV0ZVRhc2tCdXR0b25zLmZvckVhY2goKGJ0bikgPT4gKGJ0bi5kaXNhYmxlZCA9IHRydWUpKTtcblxuICBsZXQgY2hlY2tib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpO1xuICBmb3IgKGkgPSAwOyBpIDwgY2hlY2tib3gubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoY2hlY2tib3hbaV0udHlwZSA9PSBcImNoZWNrYm94XCIpIHtcbiAgICAgIGNoZWNrYm94W2ldLmRpc2FibGVkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZW5hYmxlTW9kZSgpIHtcbiAgZGVsZXRlUHJvamVjdEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuICB0YXNrRGVsZXRlQnV0dG9uLmRpc2FibGVkID0gZmFsc2U7XG4gIG5ld1Byb2plY3RCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcbiAgbmV3VGFza0J1dHRvbi5kaXNhYmxlZCA9IGZhbHNlO1xuXG4gIGxldCBkZWxldGVUYXNrQnV0dG9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYnRuLXRhc2stZGVsZXRlXCIpO1xuICBkZWxldGVUYXNrQnV0dG9ucy5mb3JFYWNoKChidG4pID0+IChidG4uZGlzYWJsZWQgPSBmYWxzZSkpO1xuXG4gIGxldCBjaGVja2JveCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW5wdXRcIik7XG4gIGZvciAoaSA9IDA7IGkgPCBjaGVja2JveC5sZW5ndGg7IGkrKykge1xuICAgIGlmIChjaGVja2JveFtpXS50eXBlID09IFwiY2hlY2tib3hcIikge1xuICAgICAgY2hlY2tib3hbaV0uZGlzYWJsZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZWRpdE1vZGUoc2VsZWN0ZWRUYXNrKSB7XG4gIHByb2plY3RDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbGlzdC1ub25lXCIpO1xuXG4gIGNvbnN0IGVkaXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmVkaXQtdGFzay1jb250YWluZXJcIik7XG4gIGNvbnN0IG5ld0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmV3dGFza1wiKTtcblxuICBlZGl0Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJlZGl0LW5vdC1hY3RpdmVcIik7XG4gIG5ld0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwibmV3LW5vdC1hY3RpdmVcIik7XG5cbiAgLy9wb3B1bGF0ZSB3aXRoIGVkaXQgaW5wdXRzXG4gIGVkaXRUYXNrSW5wdXQudmFsdWUgPSBzZWxlY3RlZFRhc2submFtZTtcbiAgZWRpdFRhc2tOb3RlLnZhbHVlID0gc2VsZWN0ZWRUYXNrLm5vdGVzO1xuICBlZGl0VGFza0RhdGUudmFsdWUgPSBzZWxlY3RlZFRhc2suZHVlRGF0ZTtcblxuICBmb3IgKGkgPSAwOyBpIDwgZWRpdFRhc2tQcmlvcml0eS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChlZGl0VGFza1ByaW9yaXR5W2ldLnZhbHVlID09IHNlbGVjdGVkVGFzay5wcmlvcml0eSkge1xuICAgICAgZWRpdFRhc2tQcmlvcml0eVtpXS5jaGVja2VkID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZXhpdEVkaXRNb2RlKCkge1xuICBjb25zdCBlZGl0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5lZGl0LXRhc2stY29udGFpbmVyXCIpO1xuICBjb25zdCBuZXdDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ld3Rhc2tcIik7XG5cbiAgZWRpdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiZWRpdC1ub3QtYWN0aXZlXCIpO1xuICBuZXdDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcIm5ldy1ub3QtYWN0aXZlXCIpO1xuXG4gIGVuYWJsZU1vZGUoKTtcblxuICBwcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJwcm9qZWN0LWxpc3Qtbm9uZVwiKTtcbn1cblxuLy9vcGVuIHNwZWNpZmljIGVkaXQgZGV0YWlsc1xudGFza3NDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJidG4tdGFzay1lZGl0XCIpKSB7XG4gICAgZGlzYWJsZU1vZGUoKTtcblxuICAgIGxldCBpZEFyciA9IGUudGFyZ2V0LmlkLnNwbGl0KFwiLVwiKTtcbiAgICBpZFRvRWRpdCA9IGlkQXJyWzFdO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdHMuZmluZChcbiAgICAgIChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkID09PSBzZWxlY3RlZFByb2plY3RJZFxuICAgICk7XG4gICAgbGV0IHNlbGVjdGVkVGFzayA9IHNlbGVjdGVkUHJvamVjdC50YXNrcy5maW5kKFxuICAgICAgKHRhc2spID0+IHRhc2suaWQgPT09IGlkVG9FZGl0XG4gICAgKTtcblxuICAgIGVkaXRNb2RlKHNlbGVjdGVkVGFzayk7XG5cbiAgICAvL3N1Ym1pdCBlZGl0IGRldGFpbHNcbiAgICBlZGl0VGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjb25zdCB0YXNrTmFtZSA9IGVkaXRUYXNrSW5wdXQudmFsdWU7XG4gICAgICBjb25zdCB0YXNrRGF0ZSA9IGVkaXRUYXNrRGF0ZS52YWx1ZTtcbiAgICAgIGNvbnN0IHRhc2tOb3RlID0gZWRpdFRhc2tOb3RlLnZhbHVlO1xuXG4gICAgICBsZXQgdGFza1ByaW9yaXR5ID0gXCJcIjtcblxuICAgICAgZm9yIChpID0gMDsgaSA8IGVkaXRUYXNrUHJpb3JpdHkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGVkaXRUYXNrUHJpb3JpdHlbaV0uY2hlY2tlZCkge1xuICAgICAgICAgIHRhc2tQcmlvcml0eSA9IGVkaXRUYXNrUHJpb3JpdHlbaV0udmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IHNlbGVjdGVkVGFzayA9IHNlbGVjdGVkUHJvamVjdC50YXNrcy5maW5kKFxuICAgICAgICAodGFzaykgPT4gdGFzay5pZCA9PT0gaWRUb0VkaXRcbiAgICAgICk7XG5cbiAgICAgIHNlbGVjdGVkVGFzay5uYW1lID0gdGFza05hbWU7XG4gICAgICBzZWxlY3RlZFRhc2subm90ZXMgPSB0YXNrTm90ZTtcbiAgICAgIHNlbGVjdGVkVGFzay5kdWVEYXRlID0gdGFza0RhdGU7XG4gICAgICBzZWxlY3RlZFRhc2sucHJpb3JpdHkgPSB0YXNrUHJpb3JpdHk7XG5cbiAgICAgIHNhdmUoKTtcbiAgICAgIGV4aXRFZGl0TW9kZSgpO1xuICAgICAgcmVuZGVyKCk7XG4gICAgICBcbiAgICB9KTtcblxuICAgIC8vY2FuY2VsIGVkaXQgYnV0dG9uXG4gICAgY29uc3QgY2FuY2VsRWRpdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYnRuLWNhbmNlbC1lZGl0LXRhc2tcIik7XG4gICAgY2FuY2VsRWRpdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgZXhpdEVkaXRNb2RlKCk7XG4gICAgfSk7XG4gIH1cbn0pO1xuXG4vL2RlbGV0ZSBpbmRpdmlkdWFsIHRhc2tcbnRhc2tzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYnRuLXRhc2stZGVsZXRlXCIpKSB7XG4gICAgbGV0IGlkQXJyID0gZS50YXJnZXQuaWQuc3BsaXQoXCItXCIpO1xuICAgIGxldCBpZFRvRGVsZXRlID0gaWRBcnJbMV07XG5cbiAgICBjb25zdCBzZWxlY3RlZFByb2plY3QgPSBwcm9qZWN0cy5maW5kKFxuICAgICAgKHByb2plY3QpID0+IHByb2plY3QuaWQgPT09IHNlbGVjdGVkUHJvamVjdElkXG4gICAgKTtcbiAgICBzZWxlY3RlZFByb2plY3QudGFza3MgPSBzZWxlY3RlZFByb2plY3QudGFza3MuZmlsdGVyKFxuICAgICAgKHRhc2spID0+IHRhc2suaWQgIT09IGlkVG9EZWxldGVcbiAgICApO1xuXG4gICAgc2F2ZSgpO1xuICAgIHJlbmRlcigpO1xuICB9XG59KTtcblxuLy9kZWxldGUgc2VsZWN0ZWQgcHJvamVjdFxuZGVsZXRlUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbiAgcHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIoKHByb2plY3QpID0+IHByb2plY3QuaWQgIT09IHNlbGVjdGVkUHJvamVjdElkKTtcbiAgc2VsZWN0ZWRQcm9qZWN0SWQgPSBudWxsO1xuXG4gIHNhdmUoKTtcbiAgcmVuZGVyKCk7XG59KTtcblxuLy9hZGQgbmV3IHByb2plY3Rcbm5ld1Byb2plY3RGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IHByb2plY3ROYW1lID0gbmV3UHJvamVjdElucHV0LnZhbHVlO1xuICBjb25zdCBwcm9qZWN0ID0gY3JlYXRlUHJvamVjdChwcm9qZWN0TmFtZSk7XG5cbiAgbmV3UHJvamVjdElucHV0LnZhbHVlID0gbnVsbDtcbiAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcblxuICBzYXZlKCk7XG4gIHJlbmRlcigpO1xufSk7XG5cbi8vYWRkIG5ldyB0YXNrXG5uZXdUYXNrRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBpZiAoc2VsZWN0ZWRQcm9qZWN0SWQgPT0gXCJudWxsXCIgfHwgc2VsZWN0ZWRQcm9qZWN0SWQgPT09IG51bGwpIHtcbiAgICBhbGVydChcIlBsZWFzZSBzZWxlY3QgYSBwcm9qZWN0IHRvIGFkZCB0aGUgbmV3IHRhc2suXCIpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHRhc2tOYW1lID0gbmV3VGFza0lucHV0LnZhbHVlO1xuICBjb25zdCB0YXNrRGF0ZSA9IG5ld1Rhc2tEYXRlLnZhbHVlO1xuICBjb25zdCB0YXNrTm90ZSA9IG5ld1Rhc2tOb3RlLnZhbHVlO1xuICBsZXQgdGFza1ByaW9yaXR5ID0gXCJcIjtcblxuICBmb3IgKGkgPSAwOyBpIDwgbmV3VGFza1ByaW9yaXR5Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKG5ld1Rhc2tQcmlvcml0eVtpXS5jaGVja2VkKSB7XG4gICAgICB0YXNrUHJpb3JpdHkgPSBuZXdUYXNrUHJpb3JpdHlbaV0udmFsdWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRhc2tOYW1lID09IG51bGwgfHwgdGFza05hbWUgPT09IFwiXCIpIHJldHVybjtcblxuICBjb25zdCB0YXNrID0gY3JlYXRlVGFzayh0YXNrTmFtZSwgdGFza05vdGUsIHRhc2tEYXRlLCB0YXNrUHJpb3JpdHkpO1xuICBuZXdUYXNrSW5wdXQudmFsdWUgPSBudWxsO1xuICBuZXdUYXNrTm90ZS52YWx1ZSA9IG51bGw7XG5cbiAgY29uc3Qgc2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdHMuZmluZChcbiAgICAocHJvamVjdCkgPT4gcHJvamVjdC5pZCA9PT0gc2VsZWN0ZWRQcm9qZWN0SWRcbiAgKTtcbiAgc2VsZWN0ZWRQcm9qZWN0LnRhc2tzLnB1c2godGFzayk7XG5cbiAgc2F2ZSgpO1xuICByZW5kZXIoKTtcbn0pO1xuXG4vL2NyZWF0ZSBuZXcgcHJvamVjdFxuZnVuY3Rpb24gY3JlYXRlUHJvamVjdChuYW1lKSB7XG4gIHJldHVybiB7XG4gICAgaWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgICBuYW1lOiBuYW1lLFxuICAgIHRhc2tzOiBbXSxcbiAgfTtcbn1cblxuLy9jcmVhdGUgbmV3IHRhc2tcbmZ1bmN0aW9uIGNyZWF0ZVRhc2sobmFtZSwgbm90ZXMsIGRhdGUsIHByaW9yaXR5KSB7XG4gIHJldHVybiB7XG4gICAgaWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgICBuYW1lOiBuYW1lLFxuICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgICBkdWVEYXRlOiBkYXRlLFxuICAgIG5vdGVzOiBub3RlcyxcbiAgICBwcmlvcml0eTogcHJpb3JpdHksXG4gIH07XG59XG5cbi8vc2F2ZSBwcm9qZWN0IGxpc3RzIGFuZCBzZWxlY3RlZCBwcm9qZWN0IGlkXG5mdW5jdGlvbiBzYXZlKCkge1xuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3QubGlzdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHMpKTtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0LnNlbGVjdGVkTGlzdElkXCIsIHNlbGVjdGVkUHJvamVjdElkKTtcbn1cblxuLy9yZW5kZXIgY29udGVudFxuZnVuY3Rpb24gcmVuZGVyKCkge1xuICBjbGVhckVsZW1lbnQocHJvamVjdENvbnRhaW5lcik7XG4gIHJlbmRlclByb2plY3RMaXN0cygpO1xuXG4gIGNvbnN0IHNlbGVjdGVkUHJvamVjdCA9IHByb2plY3RzLmZpbmQoXG4gICAgKHByb2plY3QpID0+IHByb2plY3QuaWQgPT09IHNlbGVjdGVkUHJvamVjdElkXG4gICk7XG5cbiAgLy9jaGVjayBpZiBoYXZpbmcgc2VsZWN0ZWQgcHJvamVjdCB0byBkaXNwbGF5IHRoZSBwcm9qZWN0IHRvIGRvXG4gIGlmIChzZWxlY3RlZFByb2plY3RJZCA9PSBcIm51bGxcIiB8fCBzZWxlY3RlZFByb2plY3RJZCA9PT0gbnVsbCkge1xuICAgIHByb2plY3REaXNwbGF5Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgfSBlbHNlIHtcbiAgICBwcm9qZWN0RGlzcGxheUNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICBwcm9qZWN0VGl0bGVFbGVtZW50LmlubmVyVGV4dCA9IHNlbGVjdGVkUHJvamVjdC5uYW1lO1xuICAgIHJlbmRlclRhc2tDb3VudChzZWxlY3RlZFByb2plY3QpO1xuICAgIGNsZWFyRWxlbWVudCh0YXNrc0NvbnRhaW5lcik7XG4gICAgcmVuZGVyVGFza3Moc2VsZWN0ZWRQcm9qZWN0KTtcbiAgfVxufVxuXG4vL3JlbmRlciB0YXNrXG5mdW5jdGlvbiByZW5kZXJUYXNrcyhzZWxlY3RlZFByb2plY3QpIHtcbiAgc2VsZWN0ZWRQcm9qZWN0LnRhc2tzLmZvckVhY2goKHRhc2spID0+IHtcbiAgICBjb25zdCB0YXNrRWxlbWVudCA9IGRvY3VtZW50LmltcG9ydE5vZGUodGFza1RlbXBsYXRlLmNvbnRlbnQsIHRydWUpO1xuXG4gICAgY29uc3QgdGFza1JvdyA9IHRhc2tFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudGFzay1yb3dcIik7XG5cbiAgICBpZiAodGFzay5wcmlvcml0eSA9PSBcImxvd1wiKSB7XG4gICAgICB0YXNrUm93LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWxvd1wiKTtcbiAgICB9IGVsc2UgaWYgKHRhc2sucHJpb3JpdHkgPT0gXCJtZWRpdW1cIikge1xuICAgICAgdGFza1Jvdy5jbGFzc0xpc3QuYWRkKFwidGFzay1tZWRpdW1cIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhc2tSb3cuY2xhc3NMaXN0LmFkZChcInRhc2staGlnaFwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBjaGVja2JveCA9IHRhc2tFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJpbnB1dFwiKTtcbiAgICBjaGVja2JveC5pZCA9IHRhc2suaWQ7XG4gICAgY2hlY2tib3guY2hlY2tlZCA9IHRhc2suY29tcGxldGU7XG5cbiAgICBjb25zdCBsYWJlbCA9IHRhc2tFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJsYWJlbFwiKTtcbiAgICBsYWJlbC5odG1sRm9yID0gdGFzay5pZDtcbiAgICBsYWJlbC5hcHBlbmQodGFzay5uYW1lKTtcblxuICAgIGNvbnN0IGRhdGUgPSB0YXNrRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stZGF0ZVwiKTtcbiAgICBkYXRlLmFwcGVuZCh0YXNrLmR1ZURhdGUpO1xuXG4gICAgY29uc3QgcHJpb3JpdHkgPSB0YXNrRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stcHJpb3JpdHlcIik7XG4gICAgcHJpb3JpdHkuYXBwZW5kKHRhc2sucHJpb3JpdHkpO1xuXG4gICAgY29uc3Qgbm90ZXMgPSB0YXNrRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnRhc2stbm90ZXNcIik7XG4gICAgbm90ZXMuYXBwZW5kKHRhc2subm90ZXMpO1xuXG4gICAgY29uc3QgZGV0YWlsc0J1dHRvbiA9IHRhc2tFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnRuLXRhc2stZGV0YWlsc1wiKTtcbiAgICBkZXRhaWxzQnV0dG9uLmlkID0gXCJkZXRhaWxzLVwiICsgdGFzay5pZDtcblxuICAgIGNvbnN0IGVkaXRCdXR0b24gPSB0YXNrRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi10YXNrLWVkaXRcIik7XG4gICAgZWRpdEJ1dHRvbi5pZCA9IFwiZWRpdC1cIiArIHRhc2suaWQ7XG5cbiAgICBjb25zdCBkZWxldGVCdXR0b24gPSB0YXNrRWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ0bi10YXNrLWRlbGV0ZVwiKTtcbiAgICBkZWxldGVCdXR0b24uaWQgPSBcImRlbGV0ZS1cIiArIHRhc2suaWQ7XG5cbiAgICBjb25zdCBkZXRhaWxzUm93ID0gdGFza0VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi50YXNrLWRldGFpbHMtcm93XCIpO1xuICAgIGRldGFpbHNSb3cuaWQgPSBcInJvdy1cIiArIHRhc2suaWQ7XG5cbiAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRWxlbWVudCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUYXNrQ291bnQoc2VsZWN0ZWRQcm9qZWN0KSB7XG4gIGNvbnN0IGluY29tcGxldGVUYXNrQ291bnQgPSBzZWxlY3RlZFByb2plY3QudGFza3MuZmlsdGVyKFxuICAgICh0YXNrKSA9PiAhdGFzay5jb21wbGV0ZVxuICApLmxlbmd0aDtcbiAgY29uc3QgdGFza1N0cmluZyA9IGluY29tcGxldGVUYXNrQ291bnQgPT09IDEgPyBcInRhc2tcIiA6IFwidGFza3NcIjtcbiAgdGFza3NDb3VudEVsZW1lbnQuaW5uZXJUZXh0ID0gYCR7aW5jb21wbGV0ZVRhc2tDb3VudH0gJHt0YXNrU3RyaW5nfSByZW1haW5pbmdgO1xufVxuXG5mdW5jdGlvbiByZW5kZXJQcm9qZWN0TGlzdHMoKSB7XG4gIC8vcmVuZGVyIGVhY2ggcHJvamVjdFxuICBwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgY29uc3QgcHJvakVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG5cbiAgICBwcm9qRWxlbWVudC5kYXRhc2V0LnByb2pJZCA9IHByb2plY3QuaWQ7XG4gICAgcHJvakVsZW1lbnQuY2xhc3NMaXN0LmFkZChcInByb2plY3QtbGlzdC1uYW1lXCIpO1xuICAgIHByb2pFbGVtZW50LmlubmVyVGV4dCA9IHByb2plY3QubmFtZTtcblxuICAgIGlmIChwcm9qZWN0LmlkID09PSBzZWxlY3RlZFByb2plY3RJZCkge1xuICAgICAgcHJvakVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZS1wcm9qZWN0XCIpO1xuICAgIH1cblxuICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvakVsZW1lbnQpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY2xlYXJFbGVtZW50KGVsZW1lbnQpIHtcbiAgd2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcbiAgfVxufVxuXG5yZW5kZXIoKTtcblxuIl0sIm5hbWVzIjpbInByb2plY3RDb250YWluZXIiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJuZXdQcm9qZWN0Rm9ybSIsIm5ld1Byb2plY3RJbnB1dCIsImRlbGV0ZVByb2plY3RCdXR0b24iLCJuZXdQcm9qZWN0QnV0dG9uIiwicHJvamVjdERpc3BsYXlDb250YWluZXIiLCJwcm9qZWN0VGl0bGVFbGVtZW50IiwidGFza3NDb3VudEVsZW1lbnQiLCJ0YXNrc0NvbnRhaW5lciIsInRhc2tEZWxldGVCdXR0b24iLCJ0YXNrVGVtcGxhdGUiLCJnZXRFbGVtZW50QnlJZCIsIm5ld1Rhc2tGb3JtIiwibmV3VGFza0lucHV0IiwibmV3VGFza0RhdGUiLCJuZXdUYXNrTm90ZSIsIm5ld1Rhc2tQcmlvcml0eSIsImdldEVsZW1lbnRzQnlOYW1lIiwibmV3VGFza0J1dHRvbiIsImVkaXRUYXNrRm9ybSIsImVkaXRUYXNrSW5wdXQiLCJlZGl0VGFza0RhdGUiLCJlZGl0VGFza05vdGUiLCJlZGl0VGFza1ByaW9yaXR5IiwicHJvamVjdHMiLCJKU09OIiwicGFyc2UiLCJsb2NhbFN0b3JhZ2UiLCJnZXRJdGVtIiwic2VsZWN0ZWRQcm9qZWN0SWQiLCJpZFRvRWRpdCIsImV4aXRFZGl0TW9kZSIsImVkaXRDb250YWluZXIiLCJuZXdDb250YWluZXIiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJkaXNhYmxlZCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwiYnRuIiwiY2hlY2tib3giLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImkiLCJsZW5ndGgiLCJ0eXBlIiwiZW5hYmxlTW9kZSIsInNhdmUiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwicmVuZGVyIiwiY2xlYXJFbGVtZW50IiwicHJvamVjdCIsInByb2pFbGVtZW50IiwiY3JlYXRlRWxlbWVudCIsImRhdGFzZXQiLCJwcm9qSWQiLCJpZCIsImlubmVyVGV4dCIsIm5hbWUiLCJhcHBlbmRDaGlsZCIsInNlbGVjdGVkUHJvamVjdCIsImZpbmQiLCJzdHlsZSIsImRpc3BsYXkiLCJyZW5kZXJUYXNrQ291bnQiLCJ0YXNrcyIsInRhc2siLCJ0YXNrRWxlbWVudCIsImltcG9ydE5vZGUiLCJjb250ZW50IiwidGFza1JvdyIsInByaW9yaXR5IiwiY2hlY2tlZCIsImNvbXBsZXRlIiwibGFiZWwiLCJodG1sRm9yIiwiYXBwZW5kIiwiZHVlRGF0ZSIsIm5vdGVzIiwicmVuZGVyVGFza3MiLCJpbmNvbXBsZXRlVGFza0NvdW50IiwiZmlsdGVyIiwidGFza1N0cmluZyIsImVsZW1lbnQiLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsInRhZ05hbWUiLCJ0b0xvd2VyQ2FzZSIsImFsZXJ0IiwiY29udGFpbnMiLCJzcGxpdCIsInRvZ2dsZSIsImRpc2FibGVNb2RlIiwiaWRBcnIiLCJzZWxlY3RlZFRhc2siLCJ2YWx1ZSIsImVkaXRNb2RlIiwicHJldmVudERlZmF1bHQiLCJ0YXNrTmFtZSIsInRhc2tEYXRlIiwidGFza05vdGUiLCJ0YXNrUHJpb3JpdHkiLCJpZFRvRGVsZXRlIiwiRGF0ZSIsIm5vdyIsInRvU3RyaW5nIiwicHVzaCIsImRhdGUiXSwic291cmNlUm9vdCI6IiJ9