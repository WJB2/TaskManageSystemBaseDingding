import React,{PureComponent} from 'react';

class FilePane extends React.Component{

  componentDidMount(){
    document.getElementById("file").addEventListener("change",function(e){
      console.log(e.input)
    })
  }

  upLoad(event){
    console.log(event);
    let e=window.event||event;
    let oFile=e.target.files;
    console.log(oFile);


  }

  render(){

    return(
      <div>
        <input type={"file"} id={"file"} onChange={this.upLoad.bind(this)} />
      </div>
    )
  }
}

export default FilePane;
