import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Navbar from '../comps/Navbar'
import Link from 'next/link';


export default function Home() {
  return (
    <>
    <Navbar/>
    <section className="main-1">

<div className="row">
  <div className="col-lg-6">
   <div className="text">
     Build <br/>
 Collaborate <br/>
     Work <br/>
     On Real Life Applications <br/>
   <p> with</p>
    <p style={{color:"yellow"}}>MAD CLUB </p>
    </div>
     
     <div className="button-box">
     <button  type="button" className="btn btn-primary buttons">JOIN THE FAM</button>
     <button  type="button" className="btn btn-outline-primary buttons">Know More</button>
       </div>
    </div>
    <div className="col-lg-6">
      DFJgfkJQBFK.
    </div>

</div>



    </section>

    <section className="main-2">

      <div className="row">

        <div className="col-lg-4">
        
          <Image  className="laptop-pic" src="/laptop.png" width={270} height={270} /> 

        </div>
        <div className="col-lg-8">
<div className="cont">
          <div className="head-line">
            <span style={{color:"yellow"}}>WHO</span> ARE WE ?<br/>
            
            </div>
  <p style={{fontSize:"25px",color:"white"}}>A committee more like a <span style={{color:"yellow"}}>community</span></p>
<br/><p style={{color:"#B8B2A6"}}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true  </p>

</div>
        </div>
      </div>







    </section>



    <section id="tabs">
	<div class="container">
		<h6 className="section-title h1">Tabs</h6>
		<div className="row">
			<div className="col-xs-12 ">
				<nav>
					<div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
				<a className="nav-item nav-link active"  id="nav-home-tab" data-toggle="tab" href= "#nav-home"  role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
						 <a className="nav-item nav-link" id="nav-profile-tab" href="#nav-profile"  data-toggle="tab"  role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>
						 <a className="nav-item nav-link" href="#nav-about"  id="nav-about-tab" data-toggle="tab"  role="tab" aria-controls="nav-about" aria-selected="false">About</a>
					</div>
				</nav>
				<div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
					<div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
						Et et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.
					</div>
					<div className="tab-pane fade"  name="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
						ms consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.
					</div>
					<div className="tab-pane fade" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
						ns et consectetur ipsum labore excepteur est proident excepteur ad velit occaecat qui minim occaecat veniam. Fugiat veniam incididunt anim aliqua enim pariatur veniam sunt est aute sit dolor anim. Velit non irure adipisicing aliqua ullamco irure incididunt irure non esse consectetur nostrud minim non minim occaecat. Amet duis do nisi duis veniam non est eiusmod tempor incididunt tempor dolor ipsum in qui sit. Exercitation mollit sit culpa nisi culpa non adipisicing reprehenderit do dolore. Duis reprehenderit occaecat anim ullamco ad duis occaecat ex.
					</div>
				</div>
			
			</div>
		</div>
	</div>
</section>

    </>
    
  )
}
