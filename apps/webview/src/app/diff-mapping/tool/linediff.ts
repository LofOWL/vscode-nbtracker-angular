import {diffChars} from 'diff';

export {linediff};

function linediff(parent,l2l,type:string,isOldEmpty:boolean,isNewEmpty:boolean){
    const old_one = isOldEmpty ? "" : parent.diff.old_notebook.getLineSource(l2l.old_cell_index,l2l.old_index);
    const new_one = isNewEmpty ? "" : parent.diff.new_notebook.getLineSource(l2l.new_cell_index,l2l.new_index);


    const aid = type === "old" ? parent.getlineId(l2l.old_cell_index,l2l.old_index,type) :parent.getlineId(l2l.new_cell_index,l2l.new_index,type);
    const display = document.getElementById(aid);
    const diff = type === "old" ? diffChars(new_one, old_one) : diffChars(old_one, new_one);
    const fragment = document.createDocumentFragment();
    diff.forEach((part) => {
      // green for additions, red for deletions
      // grey for common parts
      const color = part.added ? 'green' :
        part.removed ? 'red' : 'grey';
      var span = document.createElement('span');
      span.style.color = color;

      if (color === "green" && type === "old"){
        span.style.color = "red";
        span.appendChild(document
          .createTextNode(part.value));
      }else if(color === "green" && type === "new"){
        span.style.color = "green";
        span.appendChild(document
          .createTextNode(part.value));
      } else if(color !== "red" && type === "old"){
          span.appendChild(document
            .createTextNode(part.value));
      } else if(color !== "red" && type === "new"){
        span.appendChild(document
          .createTextNode(part.value));
      }
      

      fragment.appendChild(span);
    });
    
    display.appendChild(fragment);
    
  }