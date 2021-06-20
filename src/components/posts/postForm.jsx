import React, { useState, useEffect } from 'react'
import { Paper, Grid, Button } from '@material-ui/core'
import { FormProvider, useForm } from 'react-hook-form'
import Joi from 'joi-browser'
import { validate, validateField } from '../../hooks/useValidate'
import { getPost, savePost } from '../../services/postService'
import FormInput from '../common/formInput'

const PostForm = ({ history, match }) => {
    const [post, setPost] = useState({ userId: 3, id: 0, title: '', body: '' });
    const [errors, setErrors] = useState([]);
    const postId = match.params.id;
    const methods = useForm();

    const schema = {
        userId: Joi.number(),
        id: Joi.number(),
        title: Joi.string().required().label('Title'),
        body: Joi.string().required().label('Body')
    }

    const mapToViewModel = (p) => {
        setPost({
            userId: p.userId,
            id: p.id,
            title: p.title,
            body: p.body
        });
    }

    useEffect(async () => {
        if (postId === "new") return;
        const _post = await getPost(postId);
        if (!_post) return history.replace("/not-found")
        mapToViewModel(_post);
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validate(post, schema));
        if (errors) {
            return;
        }
        doSubmit(post);
    };

    const doSubmit = async (post) => {
        const allPosts = await handleAdd(post);
        history.push({
            pathname: '/posts',
            state: { posts: allPosts }
        })
    }

    const handleAdd = async (post) => {
        return await savePost(post)
    }

    const changeHandler = ({ target: input }) => {
        const newErrorObj = validateField(input, schema, errors);
        setErrors(newErrorObj);

        const newPost = { ...post };
        newPost[input.name] = input.value;
        setPost(newPost);
    }

    return (
        <>
            Post Form
            <FormProvider {...methods}>
                <form style={{ margin: "0 auto", width: "40%" }} onSubmit={handleSubmit} noValidate>
                    <Paper style={{ padding: 16 }} variant="outlined">
                        <Grid container alignItems="flex-start" spacing={2}>
                            <FormInput
                                name='title'
                                label='Title'
                                value={post.title}
                                onChange={e => changeHandler(e)}
                                required
                                size={12}
                                autoFocus={true}
                                type='text'
                                error={errors && errors['title']} />
                            <FormInput
                                name='body'
                                label='Body'
                                value={post.body}
                                onChange={(e) => changeHandler(e)}
                                required
                                size={12}
                                type='text'
                                error={errors && errors['body']} />
                            <Grid item style={{ marginTop: 16 }}>
                                <Button variant="contained" color="primary" type="submit" disabled={validate(post, schema)}>Save</Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </form>
            </FormProvider>
        </>
    )
}

export default PostForm
