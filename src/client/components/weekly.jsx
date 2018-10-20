import React from 'react';
import { Container, Row, Col, Input, Button, Fa, Modal,FormInline, ModalBody, ModalHeader, ModalFooter } from 'mdbreact';

class Weekly extends React.Component  {
 constructor(props) {
   super(props);
   this.state = {
     modal: false
   }
   this.toggle = this.toggle.bind(this);
 }

 toggle() {
   this.setState({
     modal: !this.state.modal
   });
 }

 render() {
   return(
     <Container >
       <Row>
         <Col md='6'>
           <Button color='info' onClick={this.toggle}>WEEKLY </Button>
           <Modal isOpen={this.state.modal} toggle={this.toggle} className='center'>
             <div className='modal-header primary-color white-text'>
               <h4 className='title'>
                  WEEKLY RETROSPECTIVE</h4>
               <button type='button' className='close' onClick={this.toggle}>
                 <span aria-hidden='true'>×</span>
               </button>
             </div>
             <ModalBody className='black-text'>
               <p> Breakfast </p>
             <FormInline>
               <Input label='Thumbs UP' type='checkbox' id='checkbox1' />
               <Input label='Thumbs Middle'  type='checkbox' id='checkbox2' />
               <Input label='Thumbs Down' type='checkbox' id='checkbox3' />
               <Input size='sm' label='COMMENTS'  validate error='wrong' success='right'/>
             </FormInline>
             <p> Access </p>
           <FormInline>
             <Input label='Thumbs UP' type='checkbox' id='checkbox1' />
             <Input label='Thumbs Middle'  type='checkbox' id='checkbox2' />
             <Input label='Thumbs Down' type='checkbox' id='checkbox3' />
             <Input size='sm' label='COMMENTS'  validate error='wrong' success='right'/>
           </FormInline>

           <p>Breakfast Club</p>
         <FormInline>
           <Input label='Thumbs UP' type='checkbox' id='checkbox1' />
           <Input label='Thumbs Middle'  type='checkbox' id='checkbox2' />
           <Input label='Thumbs Down' type='checkbox' id='checkbox3' />
           <Input size='sm' label='COMMENTS'  validate error='wrong' success='right'/>
         </FormInline>

           <p>Stress Managment</p>
         <FormInline>
           <Input label='Thumbs UP' type='checkbox' id='checkbox1' />
           <Input label='Thumbs Middle'  type='checkbox' id='checkbox2' />
           <Input label='Thumbs Down' type='checkbox' id='checkbox3' />
           <Input size='sm' label='COMMENTS'  validate error='wrong' success='right'/>
         </FormInline>

          <p>Lectures</p>
         <FormInline>
           <Input label='Thumbs UP' type='checkbox' id='checkbox1' />
           <Input label='Thumbs Middle'  type='checkbox' id='checkbox2' />
           <Input label='Thumbs Down' type='checkbox' id='checkbox3' />
           <Input size='sm' label='COMMENTS'  validate error='wrong' success='right'/>
         </FormInline>

         <p>Air Conditioner</p>
       <FormInline>
         <Input label='Thumbs UP' type='checkbox' id='checkbox1' />
         <Input label='Thumbs Middle'  type='checkbox' id='checkbox2' />
         <Input label='Thumbs Down' type='checkbox' id='checkbox3' />
         <Input size='sm' label='COMMENTS'  validate error='wrong' success='right'/>
       </FormInline>

       <p>Mates</p>
     <FormInline>
       <Input label='Thumbs UP' type='checkbox' id='checkbox1' />
       <Input label='Thumbs Middle'  type='checkbox' id='checkbox2' />
       <Input label='Thumbs Down' type='checkbox' id='checkbox3' />
       <Input size='sm' label='COMMENTS'  validate error='wrong' success='right'/>
     </FormInline>

       <p>Space</p>
     <FormInline>
       <Input label='Thumbs UP' type='checkbox' id='checkbox1' />
       <Input label='Thumbs Middle'  type='checkbox' id='checkbox2' />
       <Input label='Thumbs Down' type='checkbox' id='checkbox3' />
       <Input size='sm' label='COMMENTS'  validate error='wrong' success='right'/>
     </FormInline>

       <p>WIFI</p>
     <FormInline>
       <Input label='Thumbs UP' type='checkbox' id='checkbox1' />
       <Input label='Thumbs Middle'  type='checkbox' id='checkbox2' />
       <Input label='Thumbs Down' type='checkbox' id='checkbox3' />
       <Input size='sm' label='COMMENTS'  validate error='wrong' success='right'/>
     </FormInline>

       <p>Lesson Plans</p>
     <FormInline>
       <Input label='Thumbs UP' type='checkbox' id='checkbox1' />
       <Input label='Thumbs Middle'  type='checkbox' id='checkbox2' />
       <Input label='Thumbs Down' type='checkbox' id='checkbox3' />
       <Input size='sm' label='COMMENTS'  validate error='wrong' success='right'/>
     </FormInline>

       <p>cleaniness</p>
     <FormInline>
       <Input label='Thumbs UP' type='checkbox' id='checkbox1' />
       <Input label='Thumbs Middle'  type='checkbox' id='checkbox2' />
       <Input label='Thumbs Down' type='checkbox' id='checkbox3' />
       <Input size='sm' label='COMMENTS'  validate error='wrong' success='right'/>
     </FormInline>

       <p>schedule</p>
      <FormInline>
       <Input label='Thumbs UP' type='checkbox' id='checkbox1' />
       <Input label='Thumbs Middle'  type='checkbox' id='checkbox2' />
       <Input label='Thumbs Down' type='checkbox' id='checkbox3' />
       <Input size='sm' label='COMMENTS'  validate error='wrong' success='right'/>
      </FormInline>

      <p>office hours</p>
     <FormInline>
      <Input label='Thumbs UP' type='checkbox' id='checkbox1' />
      <Input label='Thumbs Middle'  type='checkbox' id='checkbox2' />
      <Input label='Thumbs Down' type='checkbox' id='checkbox3' />
      <Input size='sm' label='COMMENTS'  validate error='wrong' success='right'/>
     </FormInline>

    </ModalBody>
             <ModalFooter>
               <Button color='secondary' onClick={this.toggle}>Close</Button>{" "}
               <Button  color='primary'>Save changes</Button>
             </ModalFooter>
           </Modal>
         </Col>
       </Row>
     </Container>
   );
 }
};

export default Weekly;
