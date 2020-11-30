import { notebook } from "../nb_components/notebook";
import { line } from "../nb_components/line";

var stringSimilarity = require("string-similarity");
import { line2line } from "./line2line";

export class nbmap {
  old_notebook: notebook;
  new_notebook: notebook;
  linemap!: line2line[];

  constructor(old_notebook: notebook, new_notebook: notebook) {
    this.old_notebook = old_notebook;
    if (!this.old_notebook.isGenerated) {
      this.old_notebook.generate();
    }
    this.new_notebook = new_notebook;
    if (!this.new_notebook.isGenerated) {
      this.new_notebook.generate();
    }
  }

  generate(threshold: number = 0.5): line2line[] {
    this.linemap = [];
    let old_lines = this.old_notebook.getLines();
    let new_lines = this.new_notebook.getLines();
    old_lines.forEach((old_line) => {
      // don't compute when there is empty lineq
      if (!old_line.isEmpty) {
        var old_new_line_map = this.line2lines(old_line, new_lines);
        if (old_new_line_map && old_new_line_map.ratio > threshold) {
          new_lines.splice(new_lines.indexOf(old_new_line_map.new_line), 1);
          this.linemap.push(old_new_line_map);
        }
      }else{
        this.linemap.push(new line2line(old_line,new line(),0.0));
      }
    });
    new_lines.forEach((new_line)=>{
      this.linemap.push(new line2line(new line(),new_line,0.0));
    });
    return this.linemap;
  }

  line2lines(line: line, lines: line[]): line2line | undefined {
    var matches = stringSimilarity.findBestMatch(
      line.context,
      lines.map((x) => x.context)
    );
    var best_match_line = lines.find(
      (_, index) => index == matches.bestMatchIndex
    ) as line;

    return new line2line(line, best_match_line, matches.bestMatch.rating);
  }


  toMessage():string{
    return JSON.stringify(this.linemap.map((x)=>x.toList().toString()));
  }
  
}
