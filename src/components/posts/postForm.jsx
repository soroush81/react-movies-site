import React, { useEffect } from 'react'
import axios from 'axios'
import { Button, Paper, Grid } from '@material-ui/core'
import { FormProvider, useForm } from 'react-hook-form'
import Joi from 'joi-browser'
import UseCustomForm from '../common/useCustomForm';
import { getPost, savePost } from './postService'

const apiEndPoint = "http://jsonplaceholder.typicode.com/posts"
const PostForm = ({ history, match }) => {
    const postId = match.params.id;

    const handleAdd = async (item) => {
        savePost(item)
    }

    const schema = {
        id: Joi.number(),
        title: Joi.string().required().label('Title'),
        body: Joi.string().required().label('Body')
    }
    const mapToViewModel = (p) => {
        return {
            id: p.id,
            title: p.title,
            body: p.body
        }
    }
    const methods = useForm();
    const { handleSubmit, renderInput, renderButton, customMapToViewModel } = UseCustomForm({
        id: 0, title: '', body: ''
    }, schema, mapToViewModel);

    useEffect(async () => {
        if (postId === "new") return;

        const _post = await getPost(postId);
        console.log(_post)
        if (!_post) return history.replace("/not-found")
        customMapToViewModel(_post);
    }, []);


    const doSubmit = (item) => {
        handleAdd(item);

        history.push({
            pathname: '/posts',
            state: { post: item, new: postId }
        })
    }

    return (
        <>
            Post Form
            <FormProvider {...methods}>
                <form style={{ margin: "0 auto", width: "40%" }} onSubmit={(e) => handleSubmit(e, doSubmit)} noValidate>
                    <Paper style={{ padding: 16 }} variant="outlined">
                        <Grid container alignItems="flex-start" spacing={2}>
                            {renderInput('title', 'Title', 'text', true)}
                            {renderInput('body', 'Body')}
                        </Grid>
                        <Grid item style={{ marginTop: 16 }}>
                            {renderButton('Save', doSubmit)}
                        </Grid>
                    </Paper>
                </form>
            </FormProvider>
        </>
    )
}

export default PostForm
