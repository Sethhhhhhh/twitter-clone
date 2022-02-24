import { CalendarIcon, ChartBarIcon, EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline';
import { useRef, useState } from 'react';

import { db, storage } from '../firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

const Input = () => {
	const [input, setInput] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const [showEmojis, setShowEmojis] = useState(false);
	const [loading, setLoading] = useState(false);
	const filePickerRef = useRef(null);
	

	const addImageToPost = () => {};

	const addEmoji = (e) => {
		let sym = e.unified.split("-");
		let codesArray = [];
		sym.forEach((el) => codesArray.push("0x" + el));
		let emoji = String.fromCodePoint(...codesArray);
		setInput(input + emoji);
	};

	const sendPost = () => {
		if (loading) return;
		setLoading(true);
		
		// const docRef = await addDoc()
	}

	return (
		<div className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll`}>
			<img
				src='https://st2.depositphotos.com/1009634/7235/v/950/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg'
				alt=''
				className='h-11 w-11 rounded-full cursor-pointer'
			/>
			<div className='w-full divide-y divide-gray-700'>
				<div className={`${selectedFile && 'pd-7'} ${input && 'space-y-2.5'}`}>
					<textarea
						value={input}
						rows='2'
						onChange={(e) => setInput(e.target.value)}
						placeholder="What's happening?"
						className='bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]'
					/>
					{selectedFile && (
						<div className='relative'>
							<div 
								className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
								onClick={() => setSelectedFile(null)}
							>
								<XIcon className='text-white h-5' />
							</div>
							<img
								src={selectedFile}
								alt="" 
								className='rounded-2xl max-h-80 object-contain'
							/>
						</div>
					)}
				</div>
				<div className='flex items-center justify-between pt-2.5'>
					<div className='flex items-center'>
						<div className='icon'>
							<PhotographIcon
								className='h-[22px] text-[#1d9bf0]'
								onClick={() => filePickerRef.current.click()}
							/>
							<input 
								type='file'
								hidden 
								onChange={addImageToPost}
								ref={filePickerRef}
							/>
						</div>

						<div className="icon rotate-90">
							<ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
						</div>

						<div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
							<EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
						</div>

						<div className="icon">
							<CalendarIcon className="text-[#1d9bf0] h-[22px]" />
						</div>

						{showEmojis && (
							<Picker
								onSelect={addEmoji}
								style={{
									position: "absolute",
									marginTop: "465px",
									marginLeft: "-40px",
									maxWidth: "320px",
									borderRadius: "20px",
								}}
								theme="dark"
							/>
						)}
					</div>
					<button 
						className='bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default'
						disabled={!input.trim() && !selectedFile}
						// onClick={sendPost}	
					>Tweet</button>
				</div>
			</div>
		</div>
	)
}

export default Input