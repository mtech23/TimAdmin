import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { DashboardLayout } from "../../Components/Layout/DashboardLayout";
import BackButton from "../../Components/BackButton";
import CustomModal from "../../Components/CustomModal";
import CustomInput from '../../Components/CustomInput';
import { SelectBox } from "../../Components/CustomSelect";
import CustomButton from "../../Components/CustomButton";
export const EditAds = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState({});
    const [unit, setUnit] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        ad_image: null, // Initialize ad_image as an empty string
    });


    const Base_url = 'https://custom.mystagingserver.site/Tim-WDLLC/public/'
    const fetchCategoryData = () => {
        const LogoutData = localStorage.getItem('login');
        document.querySelector('.loaderBox').classList.remove("d-none");
        fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/admin/ads_view/${id}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${LogoutData}`
                },
            }
        )

            .then(response =>
                response.json()
            )
            .then((data) => {
                console.log(data)
                document.querySelector('.loaderBox').classList.add("d-none");
                setFormData(data.data);
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    }
    useEffect(() => {
        fetchCategoryData()
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData)
    };

    // const filehandleChange = (event) => {
    //     const file = event.target.files[0];
    //     // console.log(file.name)
    //     if (file) {
    //         const fileName = file;
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             ad_image: fileName,
    //         }));
    //     }
    //     console.log(formData)
    // };



    // const filehandleChange = (event) => {
    //     const file = event.target.files[0];

    //     if (file) {
    //         //   const fileName = URL.createObjectURL(file); 

    //         const fileName = file;
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             ad_image: fileName,
    //         }));
    //     }
    // };




    const filehandleChange = (event) => {
        const file = event.target.files[0];
    
        if (file) {
            const fileName = URL.createObjectURL(file);
    
            setFormData((prevData) => ({
                ...prevData,
                ad_image: file, // Store the actual file in formData, not just the URL
            }));
        }
    };
    


    const LogoutData = localStorage.getItem('login');


    const handleSubmit = (event) => {
        event.preventDefault();

        // Create a new FormData object
        const formDataMethod = new FormData();
        for (const key in formData) {
            formDataMethod.append(key, formData[key]);
        }

        console.log(formData)
        document.querySelector('.loaderBox').classList.remove("d-none");
        // Make the fetch request
        fetch(`https://custom.mystagingserver.site/Tim-WDLLC/public/api/admin/ads_add_update/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${LogoutData}`
            },
            body: formDataMethod // Use the FormData object as the request body
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(data);
                setShowModal(true)
            })
            .catch((error) => {
                document.querySelector('.loaderBox').classList.add("d-none");
                console.log(error)
            })
    };



    console.log("formData", formData)


    return (
        <>
            <DashboardLayout>
                <div className="dashCard mb-4">
                    <div className="row mb-3">
                        <div className="col-12 mb-2">
                            <h2 className="mainTitle">
                                <BackButton />
                                Edit Ads
                            </h2>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-12">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='Ad Title'
                                                    required
                                                    id='ad_title'
                                                    type='text'
                                                    placeholder='Enter Book Title'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="ad_title"
                                                    value={formData.ad_title}
                                                    onChange={handleChange}
                                                />


                                            </div>
                                            <div className="col-md-6 mb-4">
                                                <CustomInput
                                                    label='Upload Product Image'
                                                    
                                                    id='file'
                                                    type='file'
                                                    labelClass='mainLabel'
                                                    inputClass='mainInput'
                                                    name="image"
                                                    // value={formData?.ad_image}
                                                    onChange={filehandleChange}
                                                />

                                                <div className="galleryItem col-md-4 mb-3 position-relative">
                                                    <img src={formData?.ad_image instanceof File ? URL.createObjectURL(formData.ad_image) : Base_url + formData?.ad_image} className="w-100" />

                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <CustomButton variant='primaryButton' text='Submit' type='submit' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <CustomModal show={showModal} close={() => { setShowModal(false) }} success heading='Ads Update Successfully.' />

            </DashboardLayout>
        </>
    );
};