import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import OnlineCanteen from './pages/header/Header';
import Bg from './comp/Bg';


const App = () => {
  return (
   
    <Router>
      <Bg/>
       <OnlineCanteen/>
      {/* <div className="min-h-screen bg-gray-100">
        <nav className="bg-blue-500 text-white p-4">
          <div className="container mx-auto flex justify-between">
            <h1 className="text-lg font-bold">Auth App</h1>
            <div>
              <Link to="/login" className="px-4">
                Login
              </Link>
              <Link to="/register" className="px-4">
                Register
              </Link>
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div> */}
      <div className='max-w-7xl mx-auto p-4'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores voluptas suscipit, eum velit iusto cum tempore molestiae. Possimus doloremque iure, hic et repudiandae, aperiam at corrupti totam odit maiores dignissimos rerum exercitationem debitis odio molestias cumque fugiat consectetur sed nam eligendi. Id laudantium dicta perferendis labore magnam suscipit ea aliquid nemo quam voluptate repellat, quos ullam, nulla cumque modi doloremque enim ratione quaerat. A itaque commodi et consequatur doloremque explicabo molestiae? Ab a id, ipsa facere fuga, doloremque, quo sint ad ipsam illum architecto. Aliquam incidunt magnam, necessitatibus dolorum tenetur ipsum atque accusamus similique itaque impedit illum iste! Vitae laborum labore facilis eius dolores laboriosam dolorum, ad, deleniti repudiandae dignissimos omnis aliquid enim voluptatibus in quia atque sint provident impedit expedita sequi necessitatibus. Natus in fugit, at harum error deserunt delectus perspiciatis libero iure veniam! Repellendus nam voluptas laboriosam debitis eum eligendi magni praesentium fugit sunt possimus velit quisquam excepturi neque provident sint qui, temporibus repudiandae nulla, odio laborum doloremque! Molestiae, provident error doloribus exercitationem laudantium officia excepturi amet debitis quae modi distinctio aliquid quis officiis, repellendus numquam qui consectetur nobis perspiciatis nemo aperiam maiores quidem repellat? Accusamus voluptatem optio a architecto numquam ex fugiat laboriosam eaque expedita eos dolores nisi impedit, facilis beatae ipsum atque nam error? A sint autem commodi natus delectus recusandae, labore quod adipisci corrupti dicta? Repellat, recusandae dolores. Aliquid impedit dolor dignissimos iure necessitatibus praesentium debitis asperiores, sunt suscipit laudantium ipsam hic earum. Harum ex, laborum obcaecati blanditiis rem porro illum dolorum magni omnis facere corporis, molestias dolorem animi. Mollitia quisquam ipsa aperiam repudiandae illum perspiciatis doloribus. Alias fuga itaque vero accusantium ducimus quae ratione sapiente ipsam dolorem eligendi impedit sequi reprehenderit ut doloremque, esse odio quis? Sunt soluta enim pariatur optio eveniet harum voluptates animi error modi praesentium incidunt, ullam culpa consequatur laudantium ut aspernatur. Culpa corrupti inventore ipsam. Culpa, recusandae aliquam! Consequuntur cum reprehenderit illum iusto repellat quaerat, ullam ratione molestiae nemo nisi ipsum consectetur est corporis quidem ex, maxime, odit libero! Veniam nobis cum praesentium dignissimos fuga amet asperiores sequi nesciunt distinctio nostrum! Minus quo fugit impedit eaque, animi voluptatum dolore, ratione aperiam architecto laudantium atque doloribus ipsa ipsam. Eos consequuntur quos placeat obcaecati blanditiis harum ex omnis dolor reiciendis quaerat fugiat eligendi aut officiis nisi at iste, ad nam porro alias eaque itaque incidunt ea non. Mollitia rem quas quo autem doloribus fugit sit fugiat vel recusandae odit? Consequatur beatae minima totam et, nihil maxime porro optio quae placeat accusantium illum tempora at enim perferendis sit doloribus, similique ut consectetur, nulla corporis nisi excepturi tenetur id! Suscipit inventore nostrum quae sit placeat. Atque fugiat inventore natus aut quae iusto velit accusantium voluptas dolor odit quisquam, quis rem commodi nihil adipisci culpa mollitia et dolores est. Cum illum facilis, tempore neque voluptate molestias provident nemo, atque explicabo eligendi minus voluptatum, aperiam repellat expedita ducimus dolor quibusdam nisi distinctio corporis soluta? Fugiat facere est porro quam velit vero repellat perferendis quis sed praesentium error rem cumque delectus placeat, sunt odit. Debitis, voluptates ratione?
      </div>
    </Router>
  );
};

export default App;
