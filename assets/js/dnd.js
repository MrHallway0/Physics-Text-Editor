function DnDFileController(a,b){var c=document.querySelector(a),d=0;this.dragenter=function(a){a.stopPropagation(),a.preventDefault(),d++,c.classList.add("dropping")},this.dragover=function(a){a.stopPropagation(),a.preventDefault()},this.dragleave=function(a){a.stopPropagation(),a.preventDefault(),--d<=0&&(c.classList.remove("dropping"),d=0)},this.drop=function(a){a.stopPropagation(),a.preventDefault(),c.classList.remove("dropping"),b(a.dataTransfer)},c.addEventListener("dragenter",this.dragenter,!1),c.addEventListener("dragover",this.dragover,!1),c.addEventListener("dragleave",this.dragleave,!1),c.addEventListener("drop",this.drop,!1)}